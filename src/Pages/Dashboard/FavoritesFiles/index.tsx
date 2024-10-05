import { useGetFavoriteFiles } from '@/Hooks/useGetFavoriteFiles'
import CardView from '@/components/View/CardView'
import useAppView from '@/Hooks/useAppView'
import TableView from '@/components/View/TableView'

const FavoritesFiles = () => {
	const files = useGetFavoriteFiles()
	const { view } = useAppView()
	return view === 'card' ? <CardView files={files} /> : <TableView files={files} />
}

export default FavoritesFiles
