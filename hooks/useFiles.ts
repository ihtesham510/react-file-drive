import { api } from '@/convex/_generated/api'
import { useOrganization, useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'

export default function () {
	const { user } = useUser()
	const { organization } = useOrganization()
	const files = useQuery(api.files.getFiles, { userId: user?.id, orgId: organization?.id })
	const favFiles = useQuery(api.favorates.getFavorateFiles, { userId: user?.id, orgId: organization?.id })
	const trashFiles = useQuery(api.trash.getFiles, { userId: user?.id, orgId: organization?.id })
	return { files, favFiles, trashFiles }
}
