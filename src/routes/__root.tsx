import { createRootRoute, Outlet } from '@tanstack/react-router'
import Not_Found from '@/Pages/Not_Found'

export const Route = createRootRoute({
	component: () => <Outlet />,
	notFoundComponent: Not_Found,
})
