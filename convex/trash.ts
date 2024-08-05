import { ConvexError, v } from 'convex/values'
import { internalMutation, mutation } from './_generated/server'

export const restoreFile = mutation({
	args: { id: v.id('TrashFiles') },
	handler: async (ctx, args) => {
		const file = await ctx.db.get(args.id)
		if (!file) {
			throw new ConvexError('File not Found')
		}
		await ctx.db.insert('Files', {
			file_name: file.file_name,
			file_type: file.file_type,
			url: file.url,
			storageId: file.storageId,
			userId: file.org?.id ? undefined : file.userId,
			org: file.org?.id && file.userId ? { id: file.org.id, createdby: file.userId } : undefined,
		})
		await ctx.db.delete(args.id)
	},
})

export const deleteFromTrash = internalMutation({
	args: { id: v.id('TrashFiles'), storageId: v.id('_storage') },
	async handler(ctx, args) {
		await ctx.storage.delete(args.storageId)
		return await ctx.db.delete(args.id)
	},
})
export const deleteRecentlyMovedFile = internalMutation({
	args: {},
	handler: async ctx => {
		const recentlyMovedFile = await ctx.db
			.query('TrashFiles')
			.collect()
			.then(data => data[0])
		await ctx.storage.delete(recentlyMovedFile.storageId)
		return await ctx.db.delete(recentlyMovedFile._id)
	},
})
export const emptyTrash = internalMutation({
	args: {},
	async handler(ctx) {
		const files = await ctx.db
			.query('TrashFiles')
			.collect()
			.then(data => data)
		files.forEach(async f => {
			await ctx.db.delete(f._id)
			await ctx.storage.delete(f.storageId)
		})
	},
})
