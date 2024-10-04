import { ConvexError, v } from 'convex/values'
import { mutation, query, internalMutation } from './_generated/server'

export const getFiles = query({
	args: { userId: v.optional(v.string()), orgId: v.optional(v.string()) },
	handler: async (ctx, args) => {
		const trashFiles = await ctx.db
			.query('TrashFiles')
			.collect()
			.then(f => f.map(file => file.fileId))
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field('id'), args.userId))
			.first()
		if (!user) throw new ConvexError('User Not Found')
		const files = await ctx.db
			.query('Files')
			.filter(q => q.eq(q.field(args.orgId ? 'org.id' : 'userId'), args.orgId ?? user._id))
			.order('desc')
			.collect()
		const filteredFiles = files.filter(file => trashFiles.includes(file._id))
		return filteredFiles
	},
})

export const moveToTrash = mutation({
	args: { fileId: v.id('Files'), userId: v.id('User') },
	handler: async (ctx, args) => {
		return await ctx.db.insert('TrashFiles', { fileId: args.fileId, userId: args.userId })
	},
})

export const restoreFile = mutation({
	args: { id: v.id('Files') },
	handler: async (ctx, args) => {
		const trashFile = await ctx.db
			.query('TrashFiles')
			.filter(q => q.eq(q.field('fileId'), args.id))
			.first()

		if (!trashFile) return null
		await ctx.db.delete(trashFile._id)
		return trashFile
	},
})

export const deleteFromTrash = mutation({
	args: { id: v.id('Files') },
	async handler(ctx, args) {
		const trashFiles = await ctx.db
			.query('TrashFiles')
			.filter(q => q.eq(q.field('fileId'), args.id))
			.collect()
		const files = await ctx.db
			.query('Files')
			.filter(q => q.eq(q.field('_id'), args.id))
			.collect()
		const deletionFiles = trashFiles.filter(file => file.fileId === args.id)
		const filetodelete = files.filter(file => file._id === args.id)
		deletionFiles.forEach(async file => {
			await ctx.db.delete(file._id)
		})
		filetodelete.forEach(async file => {
			await ctx.storage.delete(file.storageId)
			await ctx.db.delete(file._id)
		})
		return filetodelete
	},
})

export const emptyTrash = mutation({
	args: { userId: v.optional(v.string()), orgId: v.optional(v.string()) },
	handler: async (ctx, args) => {
		const trashFiles = await ctx.db
			.query('TrashFiles')
			.collect()
			.then(f => f.map(file => file.fileId))
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field('id'), args.userId))
			.first()
		if (!user) throw new ConvexError('User Not Found')
		const files = await ctx.db
			.query('Files')
			.filter(q => q.eq(q.field(args.orgId ? 'org.id' : 'userId'), args.orgId ?? user._id))
			.order('desc')
			.collect()
		const filteredFiles = files.filter(file => trashFiles.includes(file._id))
		filteredFiles.forEach(async file => {
			await ctx.db.delete(file._id)
			await ctx.storage.delete(file.storageId)
		})
	},
})

export const deleteAll = internalMutation({
	handler: async ctx => {
		const trashFiles = await ctx.db.query('TrashFiles').collect()
		trashFiles.forEach(async f => {
			const file = await ctx.db.get(f.fileId)
			if (file) {
				await ctx.db.delete(file._id)
				await ctx.db.delete(f._id)
			} else {
				await ctx.db.delete(f._id)
			}
		})
	},
})

export const CleanTrashCollection = internalMutation({
	handler: async ctx => {
		const favFiles = await ctx.db.query('TrashFiles').collect()
		favFiles.forEach(async f => {
			const fileExist = await ctx.db.get(f.fileId)
			if (!fileExist) {
				return await ctx.db.delete(f._id)
			}
		})
	},
})
