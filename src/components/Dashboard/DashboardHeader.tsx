import { Input } from 'ui/input'
import { Button } from '../ui/button'
import UploadFileDialog from '../UploadFileDialog'
import { useSearchQuery } from '../SearchQueryContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'ui/select'
import { SortType, TypesofFile } from '@/lib/types'
const DashboardHeader = () => {
	const { query, setQuery, setQueryType, setSortType, sortType } = useSearchQuery()

	return (
		<div className='flex h-28 justify-between items-center mx-8'>
			<h1 className='text-3xl'>Files</h1>
			<Input placeholder='Search Files' value={query} onChange={e => setQuery(e.target.value)} className='w-64' />
			<div className='flex gap-4 justify-center'>
				<Select onValueChange={e => setQueryType(e == 'All' ? undefined : (e as TypesofFile))}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='File Type' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='All'>All Files</SelectItem>
						<SelectItem value='PDF'>PDF</SelectItem>
						<SelectItem value='JS'>Javascript</SelectItem>
						<SelectItem value='JSON'>JSON</SelectItem>
						<SelectItem value='DOC/DOCX'>MS Word</SelectItem>
						<SelectItem value='PNG/JPEG'>Image</SelectItem>
						<SelectItem value='CSV'>MS Excel</SelectItem>
						<SelectItem value='TEXT/PLAIN'>Plain Text</SelectItem>
						<SelectItem value='ZIP'>Zip</SelectItem>
					</SelectContent>
				</Select>
				<Select value={sortType} onValueChange={e => setSortType(e as SortType)}>
					<SelectTrigger>
						<SelectValue placeholder='Sort by' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='AlphAcen'>By Name Acen</SelectItem>
						<SelectItem value='AlphDes'>By Name Dec</SelectItem>
						<SelectItem value='CreatedAcen'>By Creation Time Acen</SelectItem>
						<SelectItem value='CreatedDec'>By Creation Time Dec</SelectItem>
					</SelectContent>
				</Select>
				<UploadFileDialog>
					<Button>Upload File</Button>
				</UploadFileDialog>
			</div>
		</div>
	)
}

export default DashboardHeader
