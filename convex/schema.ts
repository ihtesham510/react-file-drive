import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	Files: defineTable({
		file_name: v.string(),
		file_type: v.string(),
		favorite: v.optional(v.boolean()),
		userId: v.optional(v.string()),
		storageId: v.id('_storage'),
		url: v.string(),
		org: v.optional(
			v.object({
				id: v.string(),
				createdby: v.string(),
			}),
		),
	}).searchIndex('name', {
		searchField: 'file_name',
	}),
	TrashFiles: defineTable({
		file_name: v.string(),
		file_type: v.string(),
		url: v.string(),
		userId: v.optional(v.string()),
		storageId: v.id('_storage'),
		org: v.optional(
			v.object({
				id: v.string(),
				createdby: v.string(),
			}),
		),
	}),
	User: defineTable({
		id: v.string(),
		first_name: v.string(),
		last_name: v.optional(v.string()),
		image_url: v.string(),
		username: v.optional(v.string()),
	}),
})
