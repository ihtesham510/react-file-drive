import { useOrganization, useUser } from '@clerk/clerk-react'
import { api } from 'Convex/_generated/api'
import { Id } from 'Convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { SetStateAction } from 'react'

export type Theme = 'dark' | 'light'
const Files = () => {
	const { user } = useUser()
	const { organization } = useOrganization()
	const files = useQuery(api.files.getFiles, { userId: user?.id, orgId: organization?.id })
	return files
}
export type FileTypes = typeof Files
export type TypesofFile =
	| undefined
	| 'PDF'
	| 'JS'
	| 'JSON'
	| 'TS'
	| 'DOC/DOCX'
	| 'PNG/JPEG'
	| 'CSV'
	| 'TEXT/PLAIN'
	| 'ZIP'
export type SortType = 'AlphDes' | 'AlphAcen' | 'CreatedAcen' | 'CreatedDec'

export interface QueryContextType {
	query: string
	setQuery: React.Dispatch<SetStateAction<string>>
	type: TypesofFile
	setQueryType: React.Dispatch<SetStateAction<TypesofFile>>
	sortType: SortType
	setSortType: React.Dispatch<SetStateAction<SortType>>
}

export interface File {
	_id: Id<'Files'>
	_creationTime: number
	favorite?: boolean | undefined
	userId?: string | undefined
	org?: { id: string; createdby: string } | undefined
	file_name: string
	file_type: string
	storageId: Id<'_storage'>
	url: string
}
export type TypeFiles = File[] | undefined
