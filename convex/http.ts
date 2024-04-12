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
					await ctx.runMutation(internal.user.createUser, {
						id: result.data.id,
						username: result.data.username === null ? undefined : result.data.username,
						first_name: result.data.first_name,
						last_name: result.data.last_name === null ? undefined : result.data.last_name,
						image_url: result.data.image_url,
					})
					break
				case 'user.updated':
					await ctx.runMutation(internal.user.updateUser, {
						id: result.data.id,
						username: result.data.username === null ? undefined : result.data.username,
						first_name: result.data.first_name,
						last_name: result.data.last_name === null ? undefined : result.data.last_name,
						image_url: result.data.image_url,
					})
					break
				case 'user.deleted':
					if (result.data.id && result.data.deleted) {
						await ctx.runMutation(internal.user.deleteUserAndData, { id: result.data.id })
					}
					break
				case 'organizationMembership.created':
					break
				case 'organizationMembership.updated':
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
