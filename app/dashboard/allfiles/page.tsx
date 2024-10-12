'use client'

import useFiles from '@/hooks/useFiles'
import FileCard from '../_components/file-card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function () {
	const { files } = useFiles()
	return (
		<ScrollArea className='w-full h-[90vh] p-2'>
			<div className='grid grid-cols-3 gap-4'>
				{files && files.map(file => <FileCard file={file} key={file._id} />)}
			</div>
		</ScrollArea>
	)
}
