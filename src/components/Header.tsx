import { AuthLoading, Authenticated, Unauthenticated } from 'convex/react'
import ThemeSwitch from './ThemeSwitch'
import { ClerkLoading, SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { UserButton, OrganizationSwitcher } from './ClerkComponents'
import ToolTip from './Tooltip'
import { Skeleton } from './ui/skeleton'

const Header = () => {
	return (
		<div className='flex items-center justify-between mx-24 gap-5 border-b border-border p-4'>
			Link
			<div className='flex gap-8'>
				<SignedIn>
					<ToolTip message='Organization Switcher'>
						<OrganizationSwitcher />
					</ToolTip>
					<UserButton />
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
	)
}

export default Header
