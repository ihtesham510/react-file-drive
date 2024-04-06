import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'

export const createFile = mutation({
	args: {
		file_name: v.string(),
		file_type: v.string(),
		userId: v.string(),
		orgId: v.optional(v.string()),
		storageId: v.id('_storage'),
		favorite: v.boolean(),
		url: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert('Files', {
			file_name: args.file_name,
			file_type: args.file_type,
			url: args.url,
			storageId: args.storageId,
			userId: args.orgId ? undefined : args.userId,
			favorite: args.favorite,
			org: args.orgId ? { id: args.orgId, createdby: args.userId } : undefined,
		})
	},
})

export const getFiles = query({
	args: { userId: v.optional(v.string()), orgId: v.optional(v.string()) },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('Files')
			.filter(q => q.eq(q.field(args.orgId ? 'org.id' : 'userId'), args.orgId ?? args.userId))
			.order('desc')
			.collect()
	},
})

export const renameFile = mutation({
	args: { id: v.id('Files'), file_name: v.string() },
	handler: async (ctx, args) => await ctx.db.patch(args.id, { file_name: args.file_name }),
})

export const moveToTrash = mutation({
	args: { id: v.id('Files') },
	handler: async (ctx, args) => {
		const file = await ctx.db.get(args.id)
		if (!file) {
			throw new ConvexError('File not Found')
		}
		await ctx.db.insert('TrashFiles', {
			file_name: file.file_name,
			file_type: file.file_type,
			storageId: file.storageId,
			url: file.url,
			userId: file.org?.id ? undefined : file.userId,
			org: file.org?.id && file.userId ? { id: file.org.id, createdby: file.userId } : undefined,
		})
		await ctx.db.delete(args.id)
	},
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
