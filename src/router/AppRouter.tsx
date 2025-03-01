import MainPage from '@pages/main/Main'
import { Route, Routes } from 'react-router'
import * as endpoints from '@common/consts/endpoints'
import StationsFiltersPage from '@pages/stationsFilters/Filters'

export default function AppRouter(): React.JSX.Element {
	return (
		<Routes>
			<Route
				path={endpoints.STATIONS_LIST_FILTERS_ENDPOINT}
				element={<StationsFiltersPage />}
			/>
			<Route path='*' element={<MainPage />} />
		</Routes>
	)
}
