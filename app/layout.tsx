import { ConvexClientProvider } from '@/components/ConvexClerkProvider'
import './globals.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ConvexClientProvider>
			<html lang='en'>
				<body>{children}</body>
			</html>
		</ConvexClientProvider>
	)
}
