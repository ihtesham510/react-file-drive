import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { Globe } from '@/components/Globe'

const Home = () => {
	return (
		<div>
			<SignInButton afterSignInUrl='/dashboard/allfiles' afterSignUpUrl='/dashboard/allfiles'>
				<Button>Sign in</Button>
			</SignInButton>
			<Globe />
		</div>
	)
}

export default Home
