import { useGetFiles } from '@/Hooks/useGetFiles'
import CardView from '@/Pages/Dashboard/View/CardView/index.tsx'

const AllFiles = () => {
	const files = useGetFiles()
	return <CardView files={files} />
}

export default AllFiles
