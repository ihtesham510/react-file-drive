import { useGetFavoriteFiles } from '@/Hooks/useGetFavoriteFiles'
import CardView from '../View/CardView'

const FavoritesFiles = () => {
	const files = useGetFavoriteFiles()
	return (
		<div className=''>
			<CardView files={files} />
		</div>
	)
}

export default FavoritesFiles
