import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	Files: defineTable({
		file_name: v.string(),
		file_type: v.string(),
		userId: v.optional(v.id('User')),
		storageId: v.id('_storage'),
		url: v.string(),
		org: v.optional(
			v.object({
				id: v.string(),
				createdby: v.id('User'),
			}),
		),
	}).searchIndex('name', {
		searchField: 'file_name',
	}),
	TrashFiles: defineTable({
		userId: v.id('User'),
		fileId: v.id('Files'),
	}),
	FavoritesFiles: defineTable({
		userId: v.id('User'),
		fileId: v.id('Files'),
	}),
	User: defineTable({
		id: v.string(),
		first_name: v.string(),
		last_name: v.optional(v.string()),
		image_url: v.string(),
		username: v.optional(v.string()),
	}),
	organizations: defineTable({
		id: v.string(),
		name: v.string(),
		created_at: v.number(),
		updated_at: v.number(),
		users: v.array(v.object({ userId: v.id('User'), role: v.string() })),
	}),
})
