import { api } from 'Convex/_generated/api'
import { Id } from 'Convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const UserTag = ({ userId }: { userId?: Id<'User'> }) => {
	const u = useQuery(api.user.getUserbyId, { docId: userId })
	console.log(u)
	console.log(userId)
	return (
		<div className='flex items-center gap-3 w-full'>
			<Avatar>
				<AvatarImage src={u?.image_url} />
				<AvatarFallback>{u?.username}</AvatarFallback>
			</Avatar>
			<span>{u?.first_name ?? 'user not found'}</span>
		</div>
	)
}

export default UserTag
