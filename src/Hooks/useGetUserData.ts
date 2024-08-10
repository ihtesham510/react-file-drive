import { useOrganization, useUser } from '@clerk/clerk-react'
import { useQuery } from 'convex/react'
import { api } from 'Convex/_generated/api'
export const useGetUserData = () => {
	const { organization } = useOrganization()
	const { user } = useUser()
	const userData = useQuery(
		api.user.getUserData,
		user && organization ? { id: user.id, orgId: organization.id } : { id: user ? user.id : '' },
	)
	return userData
}
