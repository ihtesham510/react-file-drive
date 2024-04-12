import { api } from 'Convex/_generated/api'
import { Id } from 'Convex/_generated/dataModel'
import { useQuery } from 'convex/react'

const UserTag = ({ userId }: { userId?: Id<'User'> }) => {
	const u = useQuery(api.user.getUserbyId, { id: userId })
	return (
		<div className='flex items-center gap-3 w-full'>
			<img className='size-10 border-none rounded-full ' src={u?.image_url} />
			<span>{u?.first_name}</span>
		</div>
	)
}

export default UserTag
