import Dashboard from './Pages/Dashboard/index'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import UnProtectedRoute from './components/UnProtectedRoute'
import AllFiles from '@/Pages/Dashboard/AllFiles/index'
import TrashFiles from '@/Pages/Dashboard/TrashFiles/index'
import FavoritesFiles from '@/Pages/Dashboard/FavoritesFiles/index'
import Not_Found from '@/Pages/Not_Found'
import Home from './Pages/Home'
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<Not_Found />} />
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
					>
						<Route index element={<Navigate to='allfiles' replace={true} />} />
						<Route path='allfiles' element={<AllFiles />} />
						<Route path='favorites' element={<FavoritesFiles />} />
						<Route path='trash' element={<TrashFiles />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
