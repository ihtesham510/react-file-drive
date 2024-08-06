import { useGetTrashFiles } from '@/Hooks/useGetTrashFiles'
import CardView from '../View/CardView'

const TrashFiles = () => {
	const files = useGetTrashFiles()
	return (
		<div>
			<CardView files={files} />
		</div>
	)
}

export default TrashFiles
