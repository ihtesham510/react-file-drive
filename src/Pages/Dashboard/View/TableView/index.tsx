import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { TypeFiles } from '@/lib/types'
import { useOrganization } from '@clerk/clerk-react'
import { EllipsisVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FileDropDownMenu from '../../FileDropDownMenu'
import NoFiles from '@/components/NoFiles'
import EmptyTrash from '@/components/EmtpyTrash'
import { useLocation } from 'react-router'
interface Props {
	files: TypeFiles
}

const TableView: React.FC<Props> = ({ files }) => {
	const { organization } = useOrganization()
	const location = useLocation()
	const isActive = (path: string) => location.pathname.split('/').includes(path)
	if (files?.length == 0 && !isActive('trash')) return <NoFiles withButton={files?.length == 0 ? true : false} />
	if (files?.length == 0 && isActive('trash')) return <EmptyTrash />
	return (
		<Table>
			<TableCaption>
				List of all your {isActive('trash') && 'Trash'} {isActive('favorites') && 'Favorites'} Files.
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[90px]'>No.</TableHead>
					<TableHead className='w-[400px]'>File Name</TableHead>
					{organization && <TableHead className='text-right w-[200px]'>Uploaded By</TableHead>}
					<TableHead className='text-right w-[150px]'>Options</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{files &&
					files.map((file, index) => (
						<TableRow key={index}>
							<TableCell className='font-medium'>{index + 1}</TableCell>
							<TableCell>
								<p className='overflow-hidden truncate w-[150px] sm:w-[200px] md:w-[400px] lg:w-[800px] text-ellipsis whitespace-nowrap'>
									{file.file_name}
								</p>
							</TableCell>
							{organization && file.org && (
								<TableCell className='text-right'>
									<div className='flex items-center justify-end gap-3'>
										<h1 className='font-semibold mx-1'>
											{file.org.createdby.username ?? file.org.createdby.first_name}
										</h1>
										<Avatar>
											<AvatarImage src={file.org.createdby.image_url} />
											<AvatarFallback>{file.org.createdby.username ?? file.org.createdby.first_name}</AvatarFallback>
										</Avatar>
									</div>
								</TableCell>
							)}
							<TableCell className='text-right'>
								<FileDropDownMenu file={file}>
									<div>
										<EllipsisVertical className='cursor-pointer p-1 size-6 rounded-full hover:bg-primary-foreground' />
									</div>
								</FileDropDownMenu>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	)
}

export default TableView
