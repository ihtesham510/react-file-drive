import { useState } from 'react'
import { ChevronRight, FileIcon, HeartIcon, TrashIcon } from 'lucide-react'

const Sidebar = () => {
	const [open, setIsOpen] = useState(false)

	return (
		<div className={`flex flex-col w-[70px] border-border border-r-2 h-screen items-center ${open && 'w-[200px]'}`}>
			<button
				className={`w-12 h-12 flex justify-center items-center  mx-2 border-border border rounded-md mt-2 ${open && 'self-end'} `}
				onClick={() => setIsOpen(!open)}
			>
				<ChevronRight className={`${open && 'rotate-180'}`} />
			</button>
			<div className='flex flex-col w-full gap-6 my-9'>
				<button className='p-3 mx-2 border-border gap-3 border flex justify-start items-center rounded-md '>
					<FileIcon /> {open && <p className='font-semibold text-xl'>Files</p>}
				</button>
				<button className='p-3 mx-2 border-border gap-3 border flex justify-start items-center rounded-md '>
					<HeartIcon />
					{open && <p className='font-semibold text-xl'>Favorites</p>}
				</button>
				<button className='p-3 mx-2 border-border gap-3 border flex justify-start items-center rounded-md '>
					<TrashIcon />
					{open && <p className='font-semibold text-xl'>Trash</p>}
				</button>
			</div>
		</div>
	)
}

export default Sidebar
