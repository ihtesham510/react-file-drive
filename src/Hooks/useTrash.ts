import { useMutation } from 'convex/react'
import { api } from 'Convex/_generated/api'
export const useTrash = () => {
	const deleteFromTrash = useMutation(api.trash.deleteFromTrash)
	const emptyTrash = useMutation(api.trash.emptyTrash)
  const restoreFile = useMutation(api.trash.restoreFile)

	return { deleteFromTrash, emptyTrash,restoreFile }
}
