import DashboardHeader from '@/components/Dashboard/DashboardHeader'

import Files from '@/components/Dashboard/Files'
import Sidebar from '@/components/Dashboard/Sidebar'
const Dashboard = () => {
	return (
		<>
			<Sidebar />
			<DashboardHeader />
			<Files />
		</>
	)
}
export default Dashboard
