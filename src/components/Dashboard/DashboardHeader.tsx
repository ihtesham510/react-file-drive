import { Input } from 'ui/input'
import { Button } from '../ui/button'
import UploadFileDialog from '../UploadFileDialog'
import { useSearchQuery } from '../SearchQueryContext'

const DashboardHeader = () => {
	const { query, setQuery } = useSearchQuery()
	return (
		<div className='flex h-28 justify-between items-center mx-8'>
			<h1 className='text-3xl'>Files</h1>
			<Input placeholder='Search Files' value={query} onChange={e => setQuery(e.target.value)} className='w-64' />
			<UploadFileDialog>
				<Button>Upload File</Button>
			</UploadFileDialog>
		</div>
	)
}

export default DashboardHeader
