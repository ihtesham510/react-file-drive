import { useQuery } from 'convex/react'
import { api } from 'Convex/_generated/api'
import { useOrganization, useUser } from '@clerk/clerk-react'

export const useGetTrashFiles = () => {
	// TODO: Add Filter and query functionality
	const { user } = useUser()
	const { organization } = useOrganization()
	const files = useQuery(api.trash.getFiles, { userId: user?.id, orgId: organization?.id })
	return files
}
