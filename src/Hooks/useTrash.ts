import { useMutation } from 'convex/react'
import { api } from 'Convex/_generated/api'
import { useUser, useOrganization } from '@clerk/clerk-react'
export const useTrash = () => {
	const deleteFromTrash = useMutation(api.trash.deleteFromTrash)
	const { user } = useUser()
	const { organization } = useOrganization()

	const removeAllFileFromTrash = useMutation(api.trash.emptyTrash)
	const restoreFile = useMutation(api.trash.restoreFile)

	const emptyTrash = () => {
		if (user && organization) {
			removeAllFileFromTrash({ userId: user.id, orgId: organization.id })
			return
		}
		if (user) {
			removeAllFileFromTrash({ userId: user.id })
			return
		}
		throw new Error('no user or organization found')
	}

	return { deleteFromTrash, emptyTrash, restoreFile }
}
