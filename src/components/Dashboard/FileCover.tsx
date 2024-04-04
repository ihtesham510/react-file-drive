import { TypesofFile } from '@/lib/types'
import { api } from 'Convex/_generated/api'
import { Id } from 'Convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { FileCode2, FileIcon, FilePieChart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Skeleton } from 'ui/skeleton'
import 'assets/react.svg'

type Props = {
	fileType: TypesofFile
	storageId: Id<'_storage'>
	className: string
}
const FileCover: React.FC<Props> = ({ fileType, storageId, className }) => {
	const getImageUrl = useMutation(api.files.getFileUrl)
	const [url, setUrl] = useState<string>()
	useEffect(() => {
		;(async function () {
			const href = await getImageUrl({ id: storageId })
			if (href) {
				setUrl(href)
			}
		})()
	}, [storageId, fileType])

	switch (fileType) {
		case 'JS':
			return (
				<div className={className}>
					<FileCode2 className='size-14' />
				</div>
			)
		case 'TS':
			return (
				<div className={className}>
					<FileCode2 className='size-14' />
				</div>
			)
		case 'PDF':
			return (
				<div className={className}>
					<FileIcon className='size-14' />
				</div>
			)
		case 'CSV':
			return (
				<div className={className}>
					<FilePieChart className='size-14' />
				</div>
			)
		case 'TEXT/PLAIN':
			return <FileIcon />
		case 'PNG/JPEG':
			if (url) {
				return <img src={url} alt='Image' className={className} />
			} else {
				return <Skeleton className={className} />
			}
		default:
			return <Skeleton className={className} />
	}
}

export default FileCover
