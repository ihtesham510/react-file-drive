import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'

export const createFile = mutation({
	args: {
		file_name: v.string(),
		file_type: v.string(),
		userId: v.string(),
		orgId: v.optional(v.string()),
		storageId: v.id('_storage'),
		url: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field('id'), args.userId))
			.first()
		if (!user) throw new ConvexError('User Not Found')
		return await ctx.db.insert('Files', {
			file_name: args.file_name,
			file_type: args.file_type,
			url: args.url,
			storageId: args.storageId,
			userId: args.orgId ? undefined : user._id,
			org: args.orgId
				? {
						id: args.orgId,
						createdby: {
							id: user.id,
							docId: user._id,
							first_name: user.first_name,
							last_name: user.last_name,
							username: user.username,
							image_url: user.image_url,
						},
					}
				: undefined,
		})
	},
})

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
		return files.filter(file => !trashFiles.includes(file._id))
	},
})

export const renameFile = mutation({
	args: { id: v.id('Files'), file_name: v.string() },
	handler: async (ctx, args) => await ctx.db.patch(args.id, { file_name: args.file_name }),
})

export const getUploadURL = mutation(async ctx => {
	return await ctx.storage.generateUploadUrl()
})

export const getFileUrl = mutation({
	args: { id: v.id('_storage') },
	handler: async (ctx, args) => {
		return await ctx.storage.getUrl(args.id)
	},
})
