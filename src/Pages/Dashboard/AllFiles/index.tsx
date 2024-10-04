import { useGetFiles } from '@/Hooks/useGetFiles'
import CardView from '@/Pages/Dashboard/View/CardView/index.tsx'
import useAppView from '@/Hooks/useAppView'
import TableView from '../View/TableView'

const AllFiles = () => {
	const files = useGetFiles()
	const { view } = useAppView()
	return view === 'card' ? <CardView files={files} /> : <TableView files={files} />
}

export default AllFiles
