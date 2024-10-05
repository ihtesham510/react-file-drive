import { FileIcon, Star, TrashIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

export default function SideNav() {
	const location = useLocation()
	const isActive = (path: string) => location.pathname.split('/').includes(path)
	return (
		<div className='h-[75vh] w-[300px] hidden lg:block'>
			<nav className='grid ml-4 mt-6 gap-6 text-lg font-medium'>
				<Link
					to='/dashboard/allfiles'
					className={`${isActive('allfiles') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5 hover:text-foreground`}
				>
					<FileIcon className='h-5 w-5' />
					All Files
				</Link>
				<Link
					to='/dashboard/favorites'
					className={`${isActive('favorites') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5 hover:text-foreground`}
				>
					<Star className='h-5 w-5' />
					Favorites
				</Link>
				<Link
					to='/dashboard/trash'
					className={`${isActive('trash') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5 hover:text-foreground`}
				>
					<TrashIcon className='h-5 w-5' />
					Trash
				</Link>
			</nav>
		</div>
	)
}
