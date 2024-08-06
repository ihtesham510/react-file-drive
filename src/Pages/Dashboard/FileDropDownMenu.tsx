import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'ui/dropdown-menu'
import { TrashIcon, PencilIcon, ExternalLink, Undo2, Trash2Icon, Star, StarOffIcon } from 'lucide-react'
import { File } from '@/lib/types'
import { useMutation, useQuery } from 'convex/react'
import { api } from 'Convex/_generated/api'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Id } from 'Convex/_generated/dataModel'
import { useLocation } from 'react-router'
import { useTrash } from '@/Hooks/useTrash'
import { useAlertDeleteDialog } from '@/store'

type Props = {
	file: File
	children: React.ReactNode
}

const FileDropDownMenu: React.FC<Props> = ({ file, children }) => {
	const deleteFile = useMutation(api.trash.moveToTrash)
	const [fileName, setFileName] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const renameFile = useMutation(api.files.renameFile)
	const isFavorite = useQuery(api.favorates.isFavorite, { fileId: file._id })
	const { deleteFromTrash, restoreFile } = useTrash()
	const handleMoveToTrash = async () => {
		if (file.userId) {
			await deleteFile({ fileId: file._id, userId: file.userId as Id<'User'> })
		}
		if (file.org) {
			await deleteFile({ fileId: file._id, userId: file.org.createdby as Id<'User'> })
		}
	}
	const { toggleDialog, onConfirm } = useAlertDeleteDialog()
	const toggleFavorites = useMutation(api.favorates.toggleFavorite)
	const handleRename = async () => {
		await renameFile({ id: file._id, file_name: fileName })
		setIsOpen(false)
	}
	const handleRestore = async () => {
		await restoreFile({ id: file._id })
	}
	const handleDelete = async () => {
		toggleDialog()
		onConfirm(async () => await deleteFromTrash({ id: file._id }))
	}
	const handleToggleFavorites = async () => {
		if (file.org) {
			await toggleFavorites({ fileId: file._id, userId: file.org.createdby as Id<'User'> })
		}
    	if (file.userId) {
			await toggleFavorites({ fileId: file._id, userId: file.userId as Id<'User'> })
		}
	}

	const location = useLocation()
	const isActive = (path: string) => location.pathname.split('/').includes(path)

	return (
		<Dialog open={isOpen} onOpenChange={e => setIsOpen(e)}>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<div>{children}</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-52'>
					{isActive('trash') ? (
						<>
							<DropdownMenuItem className='flex justify-between' onClick={handleRestore}>
								<span className='text-lime-500'>Restore</span>
								<Undo2 size={18} className='text-lime-500' />
							</DropdownMenuItem>
							<DropdownMenuItem className='flex justify-between' onClick={handleDelete}>
								<span className='text-red-500'>Delete</span>
								<Trash2Icon size={18} className='text-red-500' />
							</DropdownMenuItem>
						</>
					) : (
						<DropdownMenuItem className='flex justify-between' onClick={handleMoveToTrash}>
							<span>Move To Trash</span>
							<TrashIcon size={18} className='text-red-400' />
						</DropdownMenuItem>
					)}
					{!isActive('trash')&& (
						<DropdownMenuItem className='flex justify-between' onClick={handleToggleFavorites}>
							{isFavorite ? (
								<>
									<span className=''>UnFavorite</span>
									<StarOffIcon size={18} className='' />
								</>
							) : (
								<>
									<span className='text-lime-500'>Favorite</span>
									<Star size={18} className='text-lime-500' />
								</>
							)}
						</DropdownMenuItem>
					)}
					{!isActive('trash') && (
						<DialogTrigger className='w-full'>
							<DropdownMenuItem className='flex justify-between'>
								<span>Rename</span>
								<PencilIcon size={18} />
							</DropdownMenuItem>
						</DialogTrigger>
					)}
					<DropdownMenuItem className='flex justify-between' onClick={() => window.open(file.url)}>
						<span>Open</span>
						<ExternalLink size={18} />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Rename File</DialogTitle>
				</DialogHeader>
				<Input
					placeholder='Enter File Name'
					onKeyUp={e => (e.key == 'Enter' ? handleRename() : undefined)}
					onChange={e => setFileName(e.target.value)}
				/>
				<DialogFooter>
					<Button onClick={handleRename}>Rename</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
export default FileDropDownMenu
