import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useMemo } from 'react'
import useTheme from '@/Hooks/useTheme'

interface Props {
	children: React.ReactNode
}
const ConvexClerkProvider: React.FC<Props> = ({ children }) => {
	const { theme } = useTheme()
	const VITE_CONVEX_URL = import.meta.env.VITE_CONVEX_URL
	const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
	if (!PUBLISHABLE_KEY) {
		throw new Error('Missing Publishable Key')
	}
	if (!VITE_CONVEX_URL) {
		throw new Error('VITE_CONVEX_URL not found')
	}
	const convex = new ConvexReactClient(VITE_CONVEX_URL as string)
	const calculatedTheme = useMemo(() => (theme === 'dark' ? dark : undefined), [theme])
	return (
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			afterSignInUrl='/dashboard'
			afterSignUpUrl='/dashboard'
			appearance={{
				baseTheme: calculatedTheme,
			}}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}
export default ConvexClerkProvider
