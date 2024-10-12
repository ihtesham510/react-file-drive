import { TypeFile } from '@/lib/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { FileIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ({ file }: { file: TypeFile }) {
	return (
		<Card className='min-w-[100px] max-w-[500px]'>
			<CardHeader>
				<CardTitle className='text-ellipsis overflow-hidden text-nowrap text-xl'>{file.file_name}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardCover fileType={file.file_type} url={file.url} />
			</CardContent>
			<CardFooter>
				<Button>Download</Button>
			</CardFooter>
		</Card>
	)
}

function CardCover({ fileType, url }: { fileType: TypeFile['file_type']; url?: TypeFile['url'] }) {
	if (fileType === 'PNG/JPEG') {
		return (
			<div className='w-full h-[200px] relative p-4 rounded-md'>
				{url && <Image src={url} alt='image' className='object-cover rounded-md' fill />}
			</div>
		)
	} else {
		return (
			<div className='w-full h-[200px] flex justify-center items-center relative'>
				<FileIcon size={80} />
			</div>
		)
	}
}
