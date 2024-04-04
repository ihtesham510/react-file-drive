import { useOrganization, useUser } from '@clerk/clerk-react'
import { api } from 'Convex/_generated/api'
import { useQuery } from 'convex/react'

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
