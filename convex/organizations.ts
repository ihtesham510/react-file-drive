import { internalMutation } from './_generated/server'
import { ConvexError, v } from 'convex/values'

export const createOrganization = internalMutation({
	args: {
		id: v.string(),
		name: v.string(),
		created_at: v.number(),
		updated_at: v.number(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert('organizations', {
			id: args.id,
			name: args.name,
			created_at: args.created_at,
			updated_at: args.updated_at,
			users: [],
		})
	},
})
export const updateOrganization = internalMutation({
	args: {
		id: v.string(),
		name: v.string(),
		created_at: v.number(),
		updated_at: v.number(),
	},
	handler: async (ctx, args) => {
		const org = await ctx.db
			.query('organizations')
			.filter(q => q.eq(q.field('id'), args.id))
			.first()
		if (!org) return 'organization not found'
		const orgId = org._id
		return await ctx.db.patch(orgId, {
			id: args.id,
			name: args.name,
			created_at: args.created_at,
			updated_at: args.updated_at,
		})
	},
})
export const deleteOrganization = internalMutation({
	args: {
		id: v.string(),
	},
	handler: async (ctx, args) => {
		const org = await ctx.db
			.query('organizations')
			.filter(q => q.eq(q.field('id'), args.id))
			.first()
		if (!org) return 'organization not found'
		return await ctx.db.delete(org._id)
	},
})

// member ship

export const createMembership = internalMutation({
	args: { orgId: v.string(), userId: v.string(), role: v.string() },
	handler: async (ctx, args) => {
		const org = await ctx.db
			.query('organizations')
			.filter(q => q.eq(q.field('id'), args.orgId))
			.first()
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field('id'), args.userId))
			.first()

		if (org && user) {
			return await ctx.db.patch(org._id, { users: [...org.users, { userId: user._id, role: args.role }] })
		}
	},
})

export const updateMembership = internalMutation({
	args: { orgId: v.string(), userId: v.string(), role: v.string() },
	handler: async (ctx, args) => {
		const org = await ctx.db
			.query('organizations')
			.filter(q => q.eq(q.field('id'), args.orgId))
			.first()
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field('id'), args.userId))
			.first()

		if (org && user) {
			const userExists = org.users.find(u => u.userId === user._id)
			if (!userExists) {
				throw new ConvexError(`User does not exists on ${org.id}`)
			} else {
				const updatedUsers = org.users.map(u => {
					if (u.userId === user._id) {
						return { ...u, role: args.role }
					} else {
						return u
					}
				})
				await ctx.db.patch(org._id, { users: updatedUsers })
				return updatedUsers
			}
		}

		if (!user) throw new ConvexError('user not found')
		if (!org) throw new ConvexError('org not found')
	},
})

export const deleteMembership = internalMutation({
	args: { orgId: v.string(), userId: v.string() },
	handler: async (ctx, args) => {
		const org = await ctx.db
			.query('organizations')
			.filter(q => q.eq(q.field('id'), args.orgId))
			.first()
		const user = await ctx.db
			.query('User')
			.filter(q => q.eq(q.field('id'), args.userId))
			.first()

		if (org && user) {
			const updatedUsers = org.users.filter(u => u.userId !== user._id)
			return await ctx.db.patch(org._id, { users: updatedUsers })
		}

		if (!user) throw new ConvexError('user not found')
		if (!org) throw new ConvexError('org not found')
	},
})