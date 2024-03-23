import Dashboard from './Pages/Dashboard'
import GetStarted from './Pages/GetStarted'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './lib/ProtectedRoute'
import UnProtectedRoute from './lib/UnProtectedRoute'
function App() {
	return (
		<>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<UnProtectedRoute>
								<GetStarted />
							</UnProtectedRoute>
						}
					/>
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
