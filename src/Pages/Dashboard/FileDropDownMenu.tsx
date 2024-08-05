import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'ui/dropdown-menu'
import { TrashIcon, PencilIcon, ExternalLink } from 'lucide-react'
import { File } from '@/lib/types'
import { useMutation } from 'convex/react'
import { api } from 'Convex/_generated/api'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Props = {
	file: File
	children: React.ReactNode
}

const FileDropDownMenu: React.FC<Props> = ({ file, children }) => {
	const deleteFile = useMutation(api.files.moveToTrash)
	const [fileName, setFileName] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const renameFile = useMutation(api.files.renameFile)
	const handleDelete = async () => await deleteFile({ id: file._id })
	const handleRename = async () => {
		await renameFile({ id: file._id, file_name: fileName })
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={e => setIsOpen(e)}>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<div>{children}</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-52'>
					<DropdownMenuItem className='flex justify-between' onClick={handleDelete}>
						<span className='text-red-400'>Delete</span>
						<TrashIcon size={18} className='text-red-400' />
					</DropdownMenuItem>
					<DialogTrigger className='w-full'>
						<DropdownMenuItem className='flex justify-between'>
							<span>Rename</span>
							<PencilIcon size={18} />
						</DropdownMenuItem>
					</DialogTrigger>
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
