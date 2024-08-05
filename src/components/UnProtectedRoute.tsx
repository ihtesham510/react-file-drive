import { useUser } from '@clerk/clerk-react'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

const UnProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useUser()
	if (!user) {
		return children
	}
	return <Navigate to='/dashboard' />
}

export default UnProtectedRoute
