import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import UploadFileDialog from '@/components/UploadFileDialog'
import { useQueryStore } from '@/store'
import { SortType, TypesofFile } from '@/lib/types'
import { ArrowDownWideNarrow, ListFilter, PlusIcon, Search, Trash2Icon } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { useLocation } from 'react-router'
import { useGetTrashFiles } from '@/Hooks/useGetTrashFiles'
import { useTrash } from '@/Hooks/useTrash'
import { useGetUserData } from '@/Hooks/useGetUserData'
interface QuerySortArrayType {
	value: SortType
	title: string
}
interface QueryFileTypeArray {
	value: TypesofFile
	title: string
}
const DashboardHeader = () => {
	const sortDropdownArray: QuerySortArrayType[] = [
		{
			value: 'AlphDes',
			title: 'By Name Dec',
		},
		{
			value: 'AlphAcen',
			title: 'By Name Ace',
		},
		{
			value: 'CreatedDec',
			title: 'By Date Dec',
		},
		{
			value: 'CreatedAcen',
			title: 'By Date Ace',
		},
	]

	const fileTypeArray: QueryFileTypeArray[] = [
		{
			value: 'PDF',
			title: 'PDF',
		},

		{
			value: 'JS',
			title: 'Javascript',
		},

		{
			value: 'JSON',
			title: 'JSON',
		},

		{
			value: 'DOC/DOCX',
			title: 'MS Word',
		},
		{
			value: 'PNG/JPEG',
			title: 'Image',
		},
		{
			value: 'CSV',
			title: 'MS Exel',
		},
		{
			value: 'TEXT/PLAIN',
			title: 'Plain Text',
		},
		{
			value: 'ZIP',
			title: 'ZIP',
		},
	]

	const { searchQuery, setQuery, setFileType, setSortType, sortType, fileType } = useQueryStore()
	function isSortItemChecked(sort: SortType): boolean {
		return sortType === sort
	}
	function isFilterTypeItemChecked(filetype: TypesofFile): boolean {
		return filetype === fileType
	}

	const location = useLocation()
	const isActive = (path: string) => location.pathname.split('/').includes(path)
	const files = useGetTrashFiles()
	const { emptyTrash } = useTrash()
	const user = useGetUserData()
	const isTrashDisabled = () => {
		if (files?.length === 0) return true
		if (user?.role && user.role !== 'org:admin') return true
		return false
	}
	return (
		<>
			<div className='flex items-center bg-background justify-between p-4'>
				<div className='relative hidden sm:block'>
					<Search className='absolute left-2 top-3 h-4 w-4 text-muted-foreground' />
					<Input
						value={searchQuery}
						onChange={e => setQuery(e.target.value)}
						placeholder='Search'
						className='pl-8 sm:[w-300px] md:w-[400px]'
					/>
				</div>

				<div className='flex gap-4 w-full justify-end items-center'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm' className='h-8 gap-1'>
								<ArrowDownWideNarrow className='h-3.5 w-3.5' />
								<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Filter</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked={fileType === undefined} onClick={() => setFileType(undefined)}>
								All Files
							</DropdownMenuCheckboxItem>
							{fileTypeArray.map((menu, index) => (
								<DropdownMenuCheckboxItem
									key={index}
									checked={isFilterTypeItemChecked(menu.value)}
									onClick={() => setFileType(menu.value)}
								>
									{menu.title}
								</DropdownMenuCheckboxItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm' className='h-8 gap-1'>
								<ListFilter className='h-3.5 w-3.5' />
								<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Sort</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Sort by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{sortDropdownArray.map((menu, index) => (
								<DropdownMenuCheckboxItem
									key={index}
									checked={isSortItemChecked(menu.value)}
									onClick={() => setSortType(menu.value)}
								>
									{menu.title}
								</DropdownMenuCheckboxItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					{isActive('trash') && user ? (
						<Button
							className='h-8 gap-2 bg-destructive group'
							size='sm'
							disabled={isTrashDisabled()}
							onClick={emptyTrash}
						>
							<Trash2Icon className='size-5 text-destructive-foreground group-hover:text-black' />
							<p className='hidden md:block text-destructive-foreground group-hover:text-black'>Empyt Trash</p>
						</Button>
					) : (
						<UploadFileDialog>
							<Button className='h-8 gap-1' size='sm'>
								<PlusIcon />
								<p className='hidden md:block'>Upload File</p>
							</Button>
						</UploadFileDialog>
					)}
				</div>
			</div>
			<div>
				<div className='relative sm:hidden mx-4 mb-5'>
					<Search className='absolute left-2 top-3 h-4 w-4 text-muted-foreground' />
					<Input
						value={searchQuery}
						onChange={e => setQuery(e.target.value)}
						placeholder='Search'
						className='pl-8 sm:[w-300px] md:w-[400px]'
					/>
				</div>
			</div>
		</>
	)
}

export default DashboardHeader
