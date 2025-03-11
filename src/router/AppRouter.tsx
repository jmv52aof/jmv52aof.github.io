import { Route, Routes } from 'react-router'
import * as endpoints from '@common/consts/endpoints'
import StationsPage from '@pages/stations/Stations'
import StationsFiltersPage from '@pages/stationsFilters/Filters'
import SessiosPage from '@pages/sessions/Sessions'
import ChargingSessionPage from '@pages/chargingSession/ChargingSession'

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
			<Route
				path={endpoints.SESSIONS_HISTORY_ENDPOINT}
				element={<SessiosPage />}
			/>
			<Route path='*' element={<StationsPage />} />
		</Routes>
	)
}
