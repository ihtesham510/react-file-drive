import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	Files: defineTable({
		file_name: v.string(),
		file_size: v.number(),
		file_type: v.string(),
		org: v.optional(
			v.object({
				createdBy: v.string(),
				id: v.string(),
			}),
		),
		storageId: v.string(),
		userId: v.optional(v.string()),
	}),
})
