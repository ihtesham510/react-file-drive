import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ConvexClerkProvider from 'components/ConvexClerkProvider'
import suppressNestingWarnings from './lib/warning'

import { Toaster } from './components/ui/toaster'
import ConfirmDeleteAlertDialog from './components/ConfirmDeleteDialog'

suppressNestingWarnings()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ConvexClerkProvider>
			<Toaster />
			<App />
			<ConfirmDeleteAlertDialog />
		</ConvexClerkProvider>
	</React.StrictMode>,
)
