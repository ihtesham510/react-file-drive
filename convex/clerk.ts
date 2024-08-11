import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import { v } from 'convex/values'
import { Webhook } from 'svix'
import { internalAction } from './_generated/server'

export const fulfill = internalAction({
	args: { headers: v.any(), payload: v.string() },
	handler: async (ctx, args) => {
		const wh = new Webhook(`whsec_KsHZzust82LTnST17WUkXsjssI/XrVgX`)
		const payload = wh.verify(args.payload, args.headers) as WebhookEvent
		return payload
	},
})
