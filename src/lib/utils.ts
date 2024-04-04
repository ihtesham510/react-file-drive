import { type ClassValue, clsx } from 'clsx'
import { useMutation } from 'convex/react'
import { twMerge } from 'tailwind-merge'
import { api } from 'convex/_generated/api'
import { TypesofFile } from './types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const allowedFiles = [
	'image/png',
	'image/jpeg',
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'text/csv',
	'application/x-zip-compressed',
	'application/json',
	'text/plain',
	'text/javascript',
]

export function checkFileSize(selectedFile: File) {
	if (selectedFile.size > 15728640) {
		return false
	}
	return true
}
export const isAllowedFile = (selectedFile: File) => {
	return allowedFiles.includes(selectedFile.type)
}

export function formatFileTypes(selectedFile: File): TypesofFile {
	switch (selectedFile.type) {
		// images
		case 'image/png':
			return 'PNG/JPEG'
		case 'image/jpeg':
			return 'PNG/JPEG'
		// pdf
		case 'application/pdf':
			return 'PDF'
		// doc or docx
		case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
			return 'DOC/DOCX'
		// csv
		case 'text/csv':
			return 'CSV'
		// zip
		case 'application/x-zip-compressed':
			return 'ZIP'
		// json
		case 'application/json':
			return 'JSON'
		// typescript
		case 'text/plain':
			return 'TS'
		// javascript
		case 'text/javascript':
			return 'JS'
	}
}

export const useUploadFile = async (file: File, name: string, userId: string, orgId?: string) => {
	const generateUploadUrl = useMutation(api.files.getUploadURL)
	const createFile = useMutation(api.files.createFile)
	const url = await generateUploadUrl()
	const result = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': file!.type },
		body: file,
	})
	const { storageId } = await result.json()
	if (orgId) {
		return await createFile({
			file_name: name,
			file_size: file.size,
			file_type: file.type,
			userId: userId,
			org: {
				id: orgId,
				createdBy: userId,
			},
			storageId: storageId,
		})
	} else {
		return await createFile({
			file_name: name,
			file_size: file.size,
			file_type: file.type,
			userId: userId,
			storageId: storageId,
		})
	}
}
export const formatFileName = (filename: string) => {
	return filename.replace(/\.[^/.]+$/, '')
}
