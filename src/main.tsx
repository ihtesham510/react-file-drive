import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ConvexClerkProvider from 'components/ConvexClerkProvider'
import { ThemeProvider } from './components/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider>
			<ConvexClerkProvider>
				<App />
			</ConvexClerkProvider>
		</ThemeProvider>
	</React.StrictMode>,
)
