import { useUser, useOrganization } from '@clerk/clerk-react'
import { api } from 'Convex/_generated/api'
import { useQuery } from 'convex/react'

export const useGetFiles = () => {
	const { user } = useUser()
	const { organization } = useOrganization()
	const files = useQuery(api.files.getFiles, { userId: user?.id, orgId: organization?.id })
	return files
}
