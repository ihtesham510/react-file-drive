import { TypesofFile } from '@/lib/types'
import { FileArchive, FileCode2, FileIcon, FileJson2, FileSpreadsheet, FileText } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
	fileType: TypesofFile
	url: string
	className: string
}
const FileCover: React.FC<Props> = ({ fileType, url, className }) => {
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
					<FileSpreadsheet className='size-14' />
				</div>
			)
		case 'JSON':
			return (
				<div className={className}>
					<FileJson2 className='size-14' />
				</div>
			)
		case 'TEXT/PLAIN':
			return (
				<div className={className}>
					<FileText className='size-14' />
				</div>
			)
		case 'ZIP':
			return (
				<div className={className}>
					<FileArchive className='size-14' />
				</div>
			)
		case 'DOC/DOCX':
			return (
				<div className={className}>
					<FileText className='size-14' />
				</div>
			)
		case 'PNG/JPEG':
			return (
				<div className={className}>
					<img src={url} alt='Image' className={`w-[325px] h-full rounded-md object-cover`} />
				</div>
			)
		default:
			return <Skeleton className={className} />
	}
}

export default FileCover
