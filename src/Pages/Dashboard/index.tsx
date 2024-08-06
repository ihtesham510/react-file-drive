import DashboardHeader from './DashboardHeader'
import { Outlet } from 'react-router'
import Header from './Header'
const Dashboard = () => {
	return (
		<>
			<Header />
			<DashboardHeader />
			<Outlet />
		</>
	)
}

export default Dashboard
