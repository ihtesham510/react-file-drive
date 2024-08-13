import { httpRouter } from 'convex/server'

import { internal } from './_generated/api'
import { httpAction } from './_generated/server'

const http = httpRouter()

http.route({
	path: '/clerk',
	method: 'POST',
	handler: httpAction(async (ctx, request) => {
		const payloadString = await request.text()
		const headerPayload = request.headers

		try {
			const result = await ctx.runAction(internal.clerk.fulfill, {
				payload: payloadString,
				headers: {
					'svix-id': headerPayload.get('svix-id')!,
					'svix-timestamp': headerPayload.get('svix-timestamp')!,
					'svix-signature': headerPayload.get('svix-signature')!,
				},
			})

			switch (result.type) {
				case 'user.created':
					if (result.data.first_name) {
						await ctx.runMutation(internal.user.createUser, {
							id: result.data.id,
							username: result.data.username === null ? undefined : result.data.username,
							first_name: result.data.first_name,
							last_name: result.data.last_name === null ? undefined : result.data.last_name,
							image_url: result.data.image_url,
						})
					}
					break
				case 'user.updated':
					if (result.data.first_name) {
						await ctx.runMutation(internal.user.updateUser, {
							id: result.data.id,
							username: result.data.username === null ? undefined : result.data.username,
							first_name: result.data.first_name,
							last_name: result.data.last_name === null ? undefined : result.data.last_name,
							image_url: result.data.image_url,
						})
					}
					break
				case 'user.deleted':
					if (result.data.id && result.data.deleted) {
						await ctx.runMutation(internal.user.deleteUserAndData, { id: result.data.id })
					}
					break

				case 'organization.created':
					console.log(`organization created ${result.data.name}`)
					await ctx.runMutation(internal.organizations.createOrganization, {
						id: result.data.id,
						name: result.data.name,
						created_at: result.data.created_at,
						updated_at: result.data.updated_at,
					})
					break
				case 'organization.updated':
					console.log(`organization updated ${result.data.name}`)
					await ctx.runMutation(internal.organizations.updateOrganization, {
						id: result.data.id,
						name: result.data.name,
						created_at: result.data.created_at,
						updated_at: result.data.updated_at,
					})
					break
				case 'organization.deleted':
					console.log(`organization deleted`)
					if (result.data.id) {
						await ctx.runMutation(internal.organizations.deleteOrganization, {
							id: result.data.id,
						})
					}
					break
				case 'organizationMembership.created':
					console.log(`Member-ship created for ${result.data.public_user_data.identifier}`)
					await ctx.runMutation(internal.organizations.createMembership, {
						role: result.data.role,
						orgId: result.data.organization.id,
						userId: result.data.public_user_data.user_id,
					})
					break
				case 'organizationMembership.deleted':
					console.log(`Member-ship deleted for ${result.data.public_user_data.identifier}`)
					await ctx.runMutation(internal.organizations.deleteMembership, {
						orgId: result.data.organization.id,
						userId: result.data.public_user_data.user_id,
					})

					break
				case 'organizationMembership.updated':
					console.log(`Member-ship updated for ${result.data.public_user_data.identifier}`)
					await ctx.runMutation(internal.organizations.updateMembership, {
						role: result.data.role,
						orgId: result.data.organization.id,
						userId: result.data.public_user_data.user_id,
					})
					break

			}

			return new Response(null, {
				status: 200,
			})
		} catch (err) {
			return new Response('Webhook Error', {
				status: 400,
			})
		}
	}),
})

export default http
