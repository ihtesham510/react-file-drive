import DashboardHeader from './DashboardHeader'
import { Outlet } from 'react-router'
import Header from './Header'
import { useEffect } from 'react'
import { useOrganization, useUser } from '@clerk/clerk-react'
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
			<Outlet />
		</>
	)
}

export default Dashboard
