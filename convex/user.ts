import { ConvexError, v } from 'convex/values'
import { internalMutation, query } from './_generated/server'
export const createUser = internalMutation({
	args: {
		id: v.string(),
		first_name: v.string(),
		last_name: v.optional(v.string()),
		image_url: v.string(),
		username: v.optional(v.string()),
	},
	async handler(ctx, args) {
		return await ctx.db.insert('User', {
			id: args.id,
			first_name: args.first_name,
			last_name: args.last_name,
			image_url: args.image_url,
			username: args.username,
		})
	},
})
export const updateUser = internalMutation({
	args: {
		id: v.string(),
		first_name: v.string(),
		last_name: v.optional(v.string()),
		image_url: v.string(),
		username: v.optional(v.string()),
	},
	async handler(ctx, args) {
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field('id'), args.id))
			.collect()
			.then(data => data.filter(user => user.id === args.id)[0])
		if (!user) throw new ConvexError('User Not found')
		return await ctx.db.patch(user._id, {
			id: args.id,
			first_name: args.first_name,
			last_name: args.last_name,
			image_url: args.image_url,
			username: args.username,
		})
	},
})
export const getUserbyId = query({
	args: { _id: v.optional(v.id('User')), id: v.optional(v.string()) },
	async handler(ctx, args) {
		return await ctx.db
			.query('User')
			.filter(q => q.eq(q.field(args._id ? '_id' : 'id'), args._id ?? args.id))
			.collect()
			.then(data => data.filter(u => (args._id ? args._id === u._id : args.id === u.id))[0])
	},
})
export const deleteUserAndData = internalMutation({
	args: { id: v.string(), _id: v.optional(v.id('User')) },
	async handler(ctx, args) {
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field(args._id ? '_id' : 'id'), args._id ?? args.id))
			.collect()
			.then(data => data.filter(u => (args._id ? args._id === u._id : args.id === u.id))[0])
		const userPersonalFiles = await ctx.db
			.query('Files')
			.filter(q => q.eq(q.field('userId'), user.id))
			.collect()
			.then(data => data)
		const userOrgFiles = await ctx.db
			.query('Files')
			.filter(q => q.eq(q.field('org.createdby'), user.id))
			.collect()
			.then(data => data)
		userPersonalFiles.forEach(async f => {
			await ctx.db.delete(f._id)
			await ctx.storage.delete(f.storageId)
		})
		userOrgFiles.forEach(async f => {
			await ctx.db.delete(f._id)
			await ctx.storage.delete(f.storageId)
		})
		return await ctx.db.delete(user._id)
	},
})
