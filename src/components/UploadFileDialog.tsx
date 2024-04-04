import { Dialog, DialogContent, DialogTitle, DialogTrigger } from 'ui/dialog'
import { PropsWithChildren, useEffect, useState } from 'react'
import { DialogFooter, DialogHeader } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from 'convex/react'
import { api } from 'Convex/_generated/api'
import { useOrganization, useUser } from '@clerk/clerk-react'
import { allowedFiles, checkFileSize, formatFileName, formatFileTypes, isAllowedFile } from '@/lib/utils'
import { TypesofFile } from '@/lib/types'
import { toast } from 'ui/use-toast'

const UploadFileDialog = ({ children }: PropsWithChildren) => {
	const [file_name, setFile_name] = useState<string>('')
	const [disabled, setDisabled] = useState<boolean>(true)
	const [file, setSelectedFile] = useState<File>()
	const [file_type, setFile_type] = useState<TypesofFile>()
	const [isOpen, setIsOpen] = useState(false)
	const { user } = useUser()
	const { organization } = useOrganization()
	const createFile = useMutation(api.files.createFile)
	const generateUploadUrl = useMutation(api.files.getUploadURL)
	useEffect(() => {
		if (file && isAllowedFile(file)) {
			setFile_name(formatFileName(file.name))
			setFile_type(formatFileTypes(file))
			if (!isAllowedFile(file)) {
				setDisabled(true)
				toast({
					variant: 'destructive',
					title: 'Invalid file type',
					description: 'The File you Selected is not Allowed',
				})
				return
			}
			if (!checkFileSize(file)) {
				setDisabled(true)
				setFile_name('')
				setFile_type(undefined)
				setSelectedFile(undefined)
				toast({ variant: 'destructive', title: 'File size exceded', description: 'The File is more then 15Mbs' })
				return
			}
			setDisabled(false)
		}
		if (!file) {
			setFile_name('')
			setFile_type(undefined)
			setDisabled(true)
		}
	}, [file])

	const handlecreateFile = async () => {
		if (user && file && file_type) {
			toast({
				title: 'Uploading',
				description: 'Uploading Your file to Our Servers',
			})
			const url = await generateUploadUrl()
			const result = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': file!.type },
				body: file,
			})
			const { storageId } = await result.json()
			await createFile({
				file_name: file_name,
				file_type: file_type,
				userId: user.id,
				favorite: true,
				orgId: organization?.id,
				storageId: storageId,
			})
			setFile_name('')
			setFile_type(undefined)
			setSelectedFile(undefined)
			toast({
				title: 'Upload Success',
				description: 'The file is uploaded to the server successfully',
			})
			setIsOpen(false)
		}
	}
	return (
		<>
			<Dialog open={isOpen} onOpenChange={e => setIsOpen(e)}>
				<DialogTrigger>{children}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Upload File</DialogTitle>
					</DialogHeader>
					<Input type='text' placeholder='File Name' value={file_name} onChange={e => setFile_name(e.target.value)} />
					<Input
						id='picture'
						type='file'
						accept={allowedFiles.toString()}
						className='hidden'
						size={500000}
						onChange={e => setSelectedFile(e.target.files![0])}
					/>
					<label htmlFor='picture' className='flex text-sm gap-4 p-3 w-full border-border border rounded-md'>
						Choose a file... <p>{file && file.name}</p>
					</label>
					<DialogFooter>
						<Button onClick={handlecreateFile} disabled={disabled}>
							Upload
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default UploadFileDialog
