import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getFavorateFiles = query({
	args: { userId: v.optional(v.string()), orgId: v.optional(v.string()) },
	handler: async (ctx, args) => {
		const fovirtesfiles = await ctx.db
			.query('FavoritesFiles')
			.collect()
			.then(f => f.map(file => file.fileId))
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
		const filteredfiles = files.filter(file => fovirtesfiles.includes(file._id))
		return filteredfiles.filter(file => !trashFiles.includes(file._id))
	},
})

export const toggleFavorite = mutation({
	args: { fileId: v.id('Files'), userId: v.id('User') },
	handler: async (ctx, args) => {
		const fileExist = await ctx.db
			.query('FavoritesFiles')
			.filter(q => q.eq(q.field('fileId'), args.fileId))
			.first()
		if (fileExist) {
			return await ctx.db.delete(fileExist._id)
		} else {
			return await ctx.db.insert('FavoritesFiles', { fileId: args.fileId, userId: args.userId })
		}
	},
})

export const isFavorite = query({
	args: { fileId: v.id('Files') },
	handler: async (ctx, args) => {
		const fileExist = await ctx.db
			.query('FavoritesFiles')
			.filter(q => q.eq(q.field('fileId'), args.fileId))
			.first()
		return !!fileExist
	},
})
