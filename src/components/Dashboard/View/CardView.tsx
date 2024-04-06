import { useGetFiles } from '@/Hooks/useGetFiles'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import FileCover from '../FileCover'
import { TypesofFile } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { EllipsisVertical } from 'lucide-react'
import FileDropDownMenu from '../FileDropDownMenu'
import NoFiles from '../NoFiles'
import { Link } from 'react-router-dom'

const CardView = () => {
	const files = useGetFiles()
	if (files?.length == 0) return <NoFiles withButton={files?.length == 0 ? true : false} />
	return (
		<div className='grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-rows-3 lg:grid-cols-4 w-max mx-auto'>
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
						<CardDescription>{file.file_type}</CardDescription>
					</CardHeader>
					<div className='w-full flex justify-center items-center'>
						<FileCover
							fileType={file.file_type as TypesofFile}
							url={file.url}
							className='w-full h-36 mx-5 flex justify-center items-center'
						/>
					</div>
					<CardFooter className='my-4'>
						<Link to='/files/myfile.pdf' target='_blank' download>
							<Button>Download</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}

export default CardView
