import { Navigate } from 'react-router'
import { PropsWithChildren } from 'react'
import { useUser } from '@clerk/clerk-react'
const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useUser()
	if (user !== undefined && user === null) {
		return <Navigate to='/' />
	} else {
		return user ? children : null
	}
}

export default ProtectedRoute
