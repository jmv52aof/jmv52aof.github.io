import MainPage from '@pages/main/Main'
import FilterPage from '@pages/filters/Filters'
import { Route, Routes } from 'react-router'
import * as endpoints from '@common/consts/endpoints'
import NotFoundPage from '@pages/notFound/NotFound'
import StationsPage from '@pages/stations/Stations'

export default function AppRouter(): React.JSX.Element {
	return (
		<Routes>
			<Route
				path={endpoints.STATIONS_LIST_FILTERS_ENDPOINT}
				element={<FilterPage />}
			/>
			<Route path={endpoints.STATIONS_LIST_ENDPOINT} element={<StationsPage />} />
			<Route path='*' element={<MainPage />} />
			{/* <Route path='*' element={<NotFoundPage />} /> */}
		</Routes>
	)
}
