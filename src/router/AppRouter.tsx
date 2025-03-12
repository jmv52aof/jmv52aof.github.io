import { Route, Routes } from 'react-router'
import * as endpoints from '@common/consts/endpoints'
import StationsPage from '@pages/stations/Stations'
import StationsFiltersPage from '@pages/stationsFilters/Filters'
import ChargingSessionPage from '@pages/chargingSession/ChargingSession'
import MainPage from '@pages/main/Main'

export default function AppRouter(): React.JSX.Element {
	return (
		<Routes>
			<Route
				path={endpoints.STATIONS_FILTERS_ENDPOINT}
				element={<StationsFiltersPage />}
			/>
			<Route
				path={`${endpoints.SESSION_PROFILE_ENDPOINT}:id`}
				element={<ChargingSessionPage />}
			/>
			<Route
				path={endpoints.STATIONS_LIST_ENDPOINT}
				element={<StationsPage />}
			/>
			<Route path='*' element={<MainPage />} />
		</Routes>
	)
}
