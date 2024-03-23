import Dashboard from './Pages/Dashboard'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './lib/ProtectedRoute'
import UnProtectedRoute from './lib/UnProtectedRoute'
import Home from './Pages/Home'
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
								<Home />
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
