import MainPage from '@pages/main/Main'
import { Route, Routes } from 'react-router'
import * as endpoints from '@common/consts/endpoints'
import NotFoundPage from '@pages/notFound/NotFound'

export default function AppRouter(): React.JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	)
}
