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
	args: { docId: v.optional(v.id('User')) },
	async handler(ctx, args) {
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field('_id'), args.docId))
			.first()
		return user ?? null
	},
})

export const getUserData = query({
	args: { id: v.string(), orgId: v.optional(v.string()) },
	handler: async (ctx, args) => {
		let role: string | undefined
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field('id'), args.id))
			.first()
		if (!user) throw new ConvexError('user not found')
		if (args.orgId) {
			const org = await ctx.db
				.query('organizations')
				.filter(q => q.eq(q.field('id'), args.orgId))
				.first()
			if (!org) throw new ConvexError('org not found')
			const orgUser = org.users.find(u => u.userId === user._id)
			if (!orgUser) throw new ConvexError(`${user.first_name} is not present in ${org.name}`)
			role = orgUser.role
		}
		return user ? { ...user, role: role } : undefined
	},
})

export const deleteUserAndData = internalMutation({
	args: { id: v.optional(v.string()), docId: v.optional(v.id('User')) },
	async handler(ctx, args) {
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field(args.docId ? '_id' : 'id'), args.docId ?? args.id))
			.first()
		if (!user) return 'user not found'
		const userPersonalFiles = await ctx.db
			.query('Files')
			.filter(q => q.eq(q.field('userId'), user._id))
			.collect()
		const userOrgFiles = await ctx.db
			.query('Files')
			.filter(q => q.eq(q.field('org.createdby'), user._id))
			.collect()
		userPersonalFiles.forEach(async f => {
			await ctx.db.delete(f._id)
			await ctx.storage.delete(f.storageId)
		})
		userOrgFiles.forEach(async f => {
			await ctx.db.delete(f._id)
			await ctx.storage.delete(f.storageId)
		})
		await ctx.db.delete(user._id)
		const data = { ...user, personalFiles: userPersonalFiles, orgFiles: userOrgFiles }
		return data
	},
})
