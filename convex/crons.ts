import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'
const crons = cronJobs()
crons.weekly('Empty Trash', { dayOfWeek: 'monday', hourUTC: 12, minuteUTC: 2 }, internal.trash.deleteAll)

crons.interval(
    "clean favorite files table",
    { minutes: 1 }, // every minute
    internal.trash.CleanTrashCollection,
);

crons.interval(
    "clean trash files table",
    { minutes: 1 }, // every minute
    internal.favorates.cleanFavoriteCollection,
);
export default crons
