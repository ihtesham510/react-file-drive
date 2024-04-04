import { useUser, useOrganization } from '@clerk/clerk-react'
import { api } from 'Convex/_generated/api'
import { useQuery } from 'convex/react'

export const useGetFavoriteFiles = () => {
	const { user } = useUser()
	const { organization } = useOrganization()
	const files = useQuery(api.favorates.getFavorateFiles, { userId: user?.id, orgId: organization?.id })
	return files
}
