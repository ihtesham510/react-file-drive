import { useOrganization, useUser } from '@clerk/clerk-react'
import { api } from 'Convex/_generated/api'
import { useQuery } from 'convex/react'
import { SetStateAction } from 'react'
import { useGetFiles } from '@/Hooks/useGetFiles'

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

export type TypeFiles = ReturnType<typeof useGetFiles>
export type File = NonNullable<TypeFiles>[number]
