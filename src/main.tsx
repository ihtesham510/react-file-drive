import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ConvexClerkProvider from 'components/ConvexClerkProvider'
import { ThemeProvider } from './components/ThemeContext'
import { Toaster } from './components/ui/toaster'
import SearchQueryContextProvider from './components/SearchQueryContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SearchQueryContextProvider>
			<ThemeProvider>
				<ConvexClerkProvider>
					<Toaster />
					<App />
				</ConvexClerkProvider>
			</ThemeProvider>
		</SearchQueryContextProvider>
	</React.StrictMode>,
)
