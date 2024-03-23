import { useUser } from '@clerk/clerk-react'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

const UnProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useUser()
	const isLoggedin = user !== undefined && user !== null
	if (isLoggedin) {
		return <Navigate to='/dashboard' />
	}
	return isLoggedin ? children : null
}

export default UnProtectedRoute
