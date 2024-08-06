import { AlignLeft } from 'lucide-react'
import { OrganizationSwitcher, UserButton } from '@/components/ClerkComponents'
import SideBarSheet from '@/components/SideSheet'
import ThemeSwitch from '@/components/ThemeSwitch'
import { Button } from '@/components/ui/button'

const Header = () => {
	return (
		<div className='flex sticky top-0 z-50 lg:bg-background backdrop-blur py-4 items-center mx-4 sm:h-20 justify-between sm:justify-between'>
			<SideBarSheet>
				<Button variant='ghost' size='sm'>
					<AlignLeft />
				</Button>
			</SideBarSheet>
			<div className='flex mt-2'>
				<OrganizationSwitcher />
			</div>
			<div className='flex justify-between items-center gap-5'>
				<UserButton />
				<span className='hidden sm:block'>
					<ThemeSwitch />
				</span>
			</div>
		</div>
	)
}

export default Header
