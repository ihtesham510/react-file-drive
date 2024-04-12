import { useGetFiles } from '@/Hooks/useGetFiles'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TypesofFile } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { EllipsisVertical } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Id } from 'Convex/_generated/dataModel'
import { useOrganization } from '@clerk/clerk-react'
import FileDropDownMenu from '../../FileDropDownMenu'
import FileCover from './FileCover'
import NoFiles from './NoFiles'
import UserTag from './UserTag'

const CardView = () => {
	const { organization } = useOrganization()
	const files = useGetFiles()
	if (files?.length == 0) return <NoFiles withButton={files?.length == 0 ? true : false} />
	return (
		<div className='grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-max mb-12 mx-auto'>
			{files?.reverse()?.map(file => (
				<Card className='size-80' key={file._id}>
					<CardHeader>
						<div className='flex justify-between'>
							<CardTitle className='overflow-hidden text-ellipsis whitespace-nowrap'>{file.file_name}</CardTitle>
							<FileDropDownMenu file={file}>
								<div>
									<EllipsisVertical className='cursor-pointer p-1 size-6 rounded-full hover:bg-primary-foreground' />
								</div>
							</FileDropDownMenu>
						</div>
						<CardDescription className='flex justify-between'>
							<p>{file.file_type}</p>
							<p>{`${new Date(file._creationTime).toLocaleDateString()} ${new Date(file._creationTime).toLocaleTimeString()}`}</p>
						</CardDescription>
					</CardHeader>
					<div className='w-full flex justify-center items-center'>
						<FileCover
							fileType={file.file_type as TypesofFile}
							url={file.url}
							className='w-full h-36 mx-5 flex justify-center items-center'
						/>
					</div>
					<CardFooter className='my-4'>
						{organization && <UserTag userId={(file.userId as Id<'User'>) ?? (file.org?.createdby as Id<'User'>)} />}
						<Link to='/files/myfile.pdf' target='_blank' download>
							<Button className='mx-auto'>Download</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}

export default CardView
