import { SignInButton } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { Globe } from '@/components/Globe'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
	component: RouteComponent,
})

export function RouteComponent() {
	return (
		<div>
			<SignInButton afterSignInUrl='/dashboard/allfiles' afterSignUpUrl='/dashboard/allfiles'>
				<Button>Sign in</Button>
			</SignInButton>
			<Globe />
		</div>
	)
}
