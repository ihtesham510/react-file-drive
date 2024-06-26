import ThemeSwitch from './ThemeSwitch'
import { ClerkLoading, OrganizationSwitcher, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Button } from './ui/button'
import ToolTip from './Tooltip'
import { Skeleton } from './ui/skeleton'
import { FileUpIcon } from 'lucide-react'

const Header = () => {
	return (
		<div className='w-full justify-center flex'>
			<div className='flex items-center h-20 lg:w-[1024px] md:w-[770px] sm:w-[640px] xl:w-full xl:mx-10  justify-between gap-5 p-4'>
				<p className='flex gap-2 items-end'>
					<FileUpIcon className='size-8' />
					<p className='text-xl'>React File-Drive</p>
				</p>
				<div className='flex gap-8'>
					<SignedIn>
						<div className='my-1'>
							<ToolTip message='Organization Switcher'>
								<OrganizationSwitcher />
							</ToolTip>
						</div>
						<div className='my-1'>
							<UserButton afterSignOutUrl='/' />
						</div>
					</SignedIn>
					<SignedOut>
						<SignInButton mode='modal'>
							<Button>Sign In</Button>
						</SignInButton>
					</SignedOut>
					<ClerkLoading>
						<Skeleton className='w-44 h-10' />
						<Skeleton className='w-10 h-10 rounded-full' />
					</ClerkLoading>
					<ThemeSwitch />
				</div>
			</div>
		</div>
	)
}

export default Header
