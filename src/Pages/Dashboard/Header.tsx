import { AlignLeft } from 'lucide-react'
import { OrganizationSwitcher, UserButton } from '@/components/ClerkComponents'
import SideBarSheet from '@/components/SideSheet'
import ThemeSwitch from '@/components/ThemeSwitch'
import { Button } from '@/components/ui/button'
import { useLocation } from 'react-router'

const Header = () => {
	const location = useLocation()
	const isActive = (path: string) => location.pathname.split('/').includes(path)
	return (
		<div className='flex sticky lg:static top-0 z-50 lg:bg-background backdrop-blur py-4 items-center mx-2 lg:mx-5 sm:h-20 justify-between'>
			<div className='lg:hidden'>
				<SideBarSheet>
					<Button variant='ghost' size='sm'>
						<AlignLeft />
					</Button>
				</SideBarSheet>
			</div>

			<div className='hidden lg:block w-[300px]'>
				<h1 className='text-2xl font-bold'>React File Drive</h1>
			</div>

			<div className='hidden lg:block'>
				<h1 className='text-2xl font-semibold '>
					{isActive('allfiles') && 'All Files'}
					{isActive('favorites') && 'Favorites Files'}
					{isActive('trash') && 'Trashed Files'}
				</h1>
			</div>

			<div className='lg:hidden mt-2'>
				<OrganizationSwitcher />
			</div>

			<div className='flex justify-end items-center gap-5 lg:w-[400px] mr-2'>
				<div className='mt-2 hidden lg:block mr-2'>
					<OrganizationSwitcher />
				</div>
				<div className='flex justify-center items-center gap-3'>
					<UserButton />
					<span className='hidden sm:block'>
						<ThemeSwitch />
					</span>
				</div>
			</div>
		</div>
	)
}

export default Header
