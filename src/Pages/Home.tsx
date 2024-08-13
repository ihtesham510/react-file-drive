import { SignInButton } from '@clerk/clerk-react'

const Home = () => {
	return (
		<div>
			<SignInButton afterSignInUrl='/dashboard/allfiles' afterSignUpUrl='/dashboard/allfiles'>
				sign in
			</SignInButton>
		</div>
	)
}

export default Home
