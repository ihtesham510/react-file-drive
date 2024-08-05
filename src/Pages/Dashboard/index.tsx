import DashboardHeader from './DashboardHeader'
import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import { Link } from 'react-router-dom'
import { FileIcon, Star, TrashIcon } from 'lucide-react'

const Dashboard = () => {
	const location = useLocation()
	const isActive = (path: string) => location.pathname.split('/').includes(path)
	return (
		<>
			<Header />
			<DashboardHeader />
			<div className=''>
				<Outlet />
			</div>
		</>
	)
}

export default Dashboard
