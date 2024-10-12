'use client'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ReactNode, useMemo } from 'react'
import { dark } from '@clerk/themes'
import useTheme from '@/hooks/useTheme'

const convex = new ConvexReactClient(process.env.VITE_CONVEX_URL!)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	const { theme } = useTheme()
	const calculatedTheme = useMemo(() => (theme == 'dark' ? dark : undefined), [theme])
	return (
		<ClerkProvider
			signInForceRedirectUrl='/dashboard/allfiles'
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
