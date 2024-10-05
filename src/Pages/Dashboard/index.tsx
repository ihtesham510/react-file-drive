import DashboardHeader from './DashboardHeader'
import { Outlet } from 'react-router'
import Header from './Header'
import { useEffect } from 'react'
import { useOrganization, useUser } from '@clerk/clerk-react'
import SideNav from '@/components/SideNav'
import { ScrollArea } from '@/components/ui/scroll-area'
const Dashboard = () => {
	const { organization } = useOrganization()
	const { user } = useUser()

	useEffect(() => {
		const favicon = document.querySelector("link[rel='icon']")
		if (favicon && user?.imageUrl) {
			favicon.setAttribute('href', user.imageUrl)
			document.title = 'Personal Account'
		}
		if (favicon && organization?.imageUrl) {
			favicon.setAttribute('href', organization.imageUrl)
			document.title = organization.name
		}
	}, [user?.imageUrl, organization?.imageUrl])
	return (
		<>
			<Header />
			<DashboardHeader />
			<div className='flex w-full h-full'>
				<SideNav />
				<ScrollArea className='h-auto w-full lg:h-[78vh] lg:w-full '>
					<Outlet />
				</ScrollArea>
			</div>
		</>
	)
}

export default Dashboard
