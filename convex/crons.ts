import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'
const crons = cronJobs()
crons.weekly('Empty Trash', { dayOfWeek: 'monday', hourUTC: 12, minuteUTC: 2 }, internal.trash.emptyTrash)
export default crons
