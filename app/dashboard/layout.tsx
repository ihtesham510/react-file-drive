import { PropsWithChildren } from 'react'
import Header from './_components/Header'

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			<div className='mt-[10vh] w-full h-auto lg:mt-0'>{children}</div>
		</>
	)
}
