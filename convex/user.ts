import { ConvexError, v } from 'convex/values'
import { internalMutation } from './_generated/server'
export const createUser = internalMutation({
	args: {
		id: v.string(),
		first_name: v.string(),
		last_name: v.string(),
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
		last_name: v.string(),
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
