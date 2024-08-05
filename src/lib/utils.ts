import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
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
		// Plain Text
		case 'text/plain':
			return 'TEXT/PLAIN'
		// javascript
		case 'text/javascript':
			return 'JS'
	}
}

export function rabinKarpSearch(text: string, pattern: string): boolean {
	const prime: number = 101
	const textLength: number = text.length
	const patternLength: number = pattern.length
	const patternHash: number = hash(pattern)
	let textHash: number = hash(text.slice(0, patternLength))
	for (let i = 0; i <= textLength - patternLength; i++) {
		if (textHash === patternHash && text.slice(i, i + patternLength) === pattern) {
			return true
		}
		textHash = rehash(text, textHash, i, patternLength, prime)
	}
	return false
}

function hash(str: string): number {
	let hashValue: number = 0
	const prime: number = 101
	for (let i = 0; i < str.length; i++) {
		hashValue += str.charCodeAt(i) * Math.pow(prime, i)
	}
	return hashValue
}

function rehash(text: string, prevHash: number, startIndex: number, patternLength: number, prime: number): number {
	const newHash: number = (prevHash - text.charCodeAt(startIndex)) / prime
	const newCharIndex: number = startIndex + patternLength
	const newHashValue: number = newHash + text.charCodeAt(newCharIndex) * Math.pow(prime, patternLength - 1)
	return newHashValue
}

export const formatFileName = (filename: string) => {
	return filename.replace(/\.[^/.]+$/, '')
}
