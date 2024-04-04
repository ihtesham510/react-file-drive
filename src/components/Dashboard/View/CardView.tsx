import { useGetFiles } from '@/Hooks/useGetFiles'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import FileCover from '../FileCover'
import { TypesofFile } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { EllipsisVertical } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from 'Convex/_generated/api'
import FileDropDownMenu from '../FileDropDownMenu'
import NoFiles from '../NoFiles'
import { useSearchQuery } from '@/components/SearchQueryContext'

const CardView = () => {
	const files = useGetFiles()
	const getFileUrl = useMutation(api.files.getFileUrl)
	const { query } = useSearchQuery()
	const filteredFiles = files?.filter(file => (query == '' ? file : file.file_name.includes(query)))
	if (filteredFiles?.length == 0) return <NoFiles withButton={files?.length == 0 ? true : false} />
	return (
		<div className='grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-rows-3 lg:grid-cols-4 w-max mx-auto'>
			{filteredFiles?.map(file => (
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
							storageId={file.storageId}
							className='w-full h-36 mx-5 flex justify-center items-center'
						/>
					</div>
					<CardFooter className='my-4'>
						<Button
							onClick={async () => {
								const url = await getFileUrl({ id: file.storageId })
								url && window.open(url)
							}}
						>
							Download
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}

export default CardView
