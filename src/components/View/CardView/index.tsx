import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { TypeFiles, TypesofFile } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { DownloadIcon, EllipsisVertical } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useOrganization } from '@clerk/clerk-react'
import FileDropDownMenu from '@/components/FileDropDownMenu'
import FileCover from './FileCover'
import NoFiles from '@/components/NoFiles'
import EmptyTrash from '@/components/EmtpyTrash'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface Props {
	files: TypeFiles
}
const CardView: React.FC<Props> = ({ files }) => {
	const { organization } = useOrganization()
	const location = useLocation()
	const isActive = (path: string) => location.pathname.split('/').includes(path)
	if (files?.length == 0 && !isActive('trash')) return <NoFiles withButton={files?.length == 0 ? true : false} />
	if (files?.length == 0 && isActive('trash')) return <EmptyTrash />
	return (
		<div className='h-max w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
			{files?.reverse()?.map(file => (
				<Card className='' key={file._id}>
					<CardHeader>
						<div className='flex justify-between'>
							<CardTitle className='overflow-hidden text-ellipsis whitespace-nowrap h-9 w-[290px]'>
								{file.file_name}
							</CardTitle>
							<FileDropDownMenu file={file}>
								<div>
									<EllipsisVertical className='cursor-pointer p-1 size-6 rounded-full hover:bg-primary-foreground' />
								</div>
							</FileDropDownMenu>
						</div>
						<CardDescription className='flex justify-between'>
							<p>{file.file_type}</p>
							<p>{` On ${new Date(file._creationTime).toLocaleDateString()} At ${new Date(file._creationTime).toLocaleTimeString()}`}</p>
						</CardDescription>
					</CardHeader>
					<div className='w-full flex justify-center items-center'>
						<FileCover
							fileType={file.file_type as TypesofFile}
							url={file.url}
							className='w-[325px] h-36 mx-5 flex justify-center items-center'
						/>
					</div>
					<CardFooter className='my-6'>
						{organization && file.org && (
							<div className='flex items-center gap-3 w-full'>
								<Avatar>
									<AvatarImage src={file.org.createdby.image_url} />
									<AvatarFallback>{file.org.createdby.username}</AvatarFallback>
								</Avatar>
								<span>{file.org.createdby.username ?? file.org.createdby.first_name}</span>
							</div>
						)}
						<Link to={file.url} target='_blank' download>
							<Button className='mx-auto flex gap-1' size='sm'>
								<DownloadIcon className='size-4' />
								<p>Download</p>
							</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}

export default CardView
