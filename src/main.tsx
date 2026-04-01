import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import ConvexClerkProvider from 'components/ConvexClerkProvider'
import { routeTree } from '@/routeTree.gen'
import ConfirmDeleteAlertDialog from './components/ConfirmDeleteDialog'
import { Toaster } from './components/ui/toaster'
import suppressNestingWarnings from './lib/warning'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

suppressNestingWarnings()
const doc = document.getElementById('root')

function App() {
	return <RouterProvider router={router} />
}

if (doc) {
	ReactDOM.createRoot(doc).render(
		<React.StrictMode>
			<ConvexClerkProvider>
				<Toaster />
				<App />
				<ConfirmDeleteAlertDialog />
			</ConvexClerkProvider>
		</React.StrictMode>,
	)
}
