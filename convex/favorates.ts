import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getFavorateFiles = query({
	args: { userId: v.optional(v.string()), orgId: v.optional(v.string()) },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('Files')
			.filter(
				q =>
					q.eq(q.field(args.orgId ? 'org.id' : 'userId'), args.orgId ?? args.userId) && q.eq(q.field('favorite'), true),
			)
			.collect()
	},
})
export const toggleFavorite = mutation({
	args: { id: v.id('Files'), favorite: v.boolean() },
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, { favorite: args.favorite })
	},
})
