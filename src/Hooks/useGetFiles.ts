import { rabinKarpSearch } from '@/lib/utils'
import { useQueryStore } from '@/store'
import { useUser, useOrganization } from '@clerk/clerk-react'
import { api } from 'Convex/_generated/api'
import { useQuery } from 'convex/react'
import { useMemo } from 'react'

export const useGetFiles = () => {
	const { user } = useUser()
	const { organization } = useOrganization()

	const files = useQuery(api.files.getFiles, { userId: user?.id, orgId: organization?.id })

	const { searchQuery, fileType, sortType } = useQueryStore()

	const filteredFiles = useMemo(() => {
		if (!files) {
			return files
		}
		switch (sortType) {
			case 'AlphDes':
				files.sort((a, b) => a.file_name.localeCompare(b.file_name))
				break
			case 'AlphAcen':
				files.sort((a, b) => b.file_name.localeCompare(a.file_name))
				break
			case 'CreatedDec':
				files.sort((a, b) => b._creationTime - a._creationTime)
				break
			case 'CreatedAcen':
				files.sort((a, b) => a._creationTime - b._creationTime)
				break
		}
		if (searchQuery === '' && fileType === undefined) {
			return files
		}
		return files?.filter(file => {
			const queryMatch = searchQuery === '' || rabinKarpSearch(file.file_name.toLowerCase(), searchQuery.toLowerCase())
			const typeMatch = fileType === undefined || file.file_type === fileType
			return queryMatch && typeMatch
		})
	}, [files, searchQuery, fileType, sortType])

	return filteredFiles
}
