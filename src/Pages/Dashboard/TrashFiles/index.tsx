import { useGetTrashFiles } from '@/Hooks/useGetTrashFiles'
import CardView from '@/components/View/CardView'
import useAppView from '@/Hooks/useAppView'
import TableView from '@/components/View/TableView'

const TrashFiles = () => {
	const files = useGetTrashFiles()
	const { view } = useAppView()
	return view === 'card' ? <CardView files={files} /> : <TableView files={files} />
}

export default TrashFiles
