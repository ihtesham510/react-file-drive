import { Dialog, DialogContent, DialogTitle, DialogTrigger } from 'ui/dialog'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { DialogFooter, DialogHeader } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from 'convex/react'
import { api } from 'Convex/_generated/api'
import { useOrganization, useUser } from '@clerk/clerk-react'
import { allowedFiles, checkFileSize, formatFileName, formatFileTypes, isAllowedFile } from '@/lib/utils'
import { TypesofFile } from '@/lib/types'
import { toast } from 'ui/use-toast'
import { Loader2Icon } from 'lucide-react'
import axios from 'axios'
import { Progress } from './ui/progress'

const UploadFileDialog = ({ children }: PropsWithChildren) => {
	// TODO: Refactore UploadFileDialog.tsx
	const [file_name, setFile_name] = useState<string>('')
	const [disabled, setDisabled] = useState<boolean>(true)
	const [file, setSelectedFile] = useState<File>()
	const [file_type, setFile_type] = useState<TypesofFile>()
	const [isOpen, setIsOpen] = useState(false)
	const [status, setStatus] = useState<'Uploading' | 'Storing' | 'Creating'>()
	const { user } = useUser()
	const [progress, setProgress] = useState(0)
	const { organization } = useOrganization()
	const createFile = useMutation(api.files.createFile)
	const generateUploadUrl = useMutation(api.files.getUploadURL)
	const getFileUrl = useMutation(api.files.getFileUrl)
	useEffect(() => {
		setDisabled(status !== undefined)
	}, [status])
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
	const handlecreateFile = useCallback(async () => {
		if (user && file && file_type) {
			setStatus('Uploading')
			toast({
				title: 'Uploading',
				description: 'Your File is Uploading Please Wait',
				duration: 2000,
			})
			const url = await generateUploadUrl()
			const { storageId } = await axios
				.post(url, file, {
					headers: { 'Content-Type': file.type },
					onUploadProgress: ProgressEvent => {
						const { loaded, progress, total } = ProgressEvent
						if (total && progress) {
							const percentage = (loaded * 100) / total
							setProgress(+percentage.toFixed(2))
						}
					},
				})
				.then(data => data.data)
			setStatus('Storing')
			const fileUrl = await getFileUrl({ id: storageId })
			if (!fileUrl) {
				throw new Error('Error while generating file url')
			}
			setStatus('Creating')
			await createFile({
				file_name: file_name,
				file_type: file_type,
				userId: user.id,
				url: fileUrl.toString(),
				favorite: false,
				orgId: organization?.id,
				storageId: storageId,
			})
			toast({
				title: 'Upload Success',
				description: 'The file is uploaded to the server successfully',
			})
			setIsOpen(false)
			setStatus(undefined)
			setFile_name('')
			setFile_type(undefined)
			setSelectedFile(undefined)
			setProgress(0)
		}
	}, [status, setStatus, isOpen, setIsOpen, setFile_type, file_name, setFile_type, file_type, createFile, toast])
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
						onChange={e => setSelectedFile(e.target.files![0])}
					/>
					<label htmlFor='picture' className='flex text-sm gap-4 p-3 w-full border-border border rounded-md'>
						Choose a file... <p>{file && file.name}</p>
					</label>
					{status && (
						<>
							<label htmlFor='progress' className='flex justify-between'>
								{status}...<p>{progress}%</p>
							</label>
							<Progress value={progress} id='progress' className='h-1' />
						</>
					)}
					<DialogFooter>
						<Button onClick={handlecreateFile} disabled={disabled} className='flex justify-center w-[100px]'>
							{status ? <Loader2Icon size={20} className='animate-spin' /> : 'Upload'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default UploadFileDialog
