import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import ThemeSwitcher from './ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { Sidebar } from 'lucide-react'
import PathDisplay from './PathDisplay'
export default function Header() {
	return (
		<header className='flex justify-between items-center z-10 lg:z-0 backdrop-blur sticky lg:static top-0 w-full h-[10vh]'>
			<Button variant='outline' size='icon' className='lg:hidden ml-4'>
				<Sidebar />
			</Button>
			<h1 className='text-xl hidden lg:block font-bold ml-4'>React File Drive</h1>
			<PathDisplay className='hidden lg:block text-2xl font-bold' />
			<Button variant='outline' size='sm' className='lg:hidden'>
				<OrganizationSwitcher />
			</Button>
			<div className='flex gap-4 mr-4'>
				<Button variant='outline' size='sm' className='hidden lg:block'>
					<OrganizationSwitcher />
				</Button>
				<Button variant='ghost' size='icon' className='rounded-full'>
					<UserButton />
				</Button>
				<span className='hidden lg:block'>
					<ThemeSwitcher />
				</span>
			</div>
		</header>
	)
}
