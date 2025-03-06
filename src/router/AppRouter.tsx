import MainPage from '@pages/main/Main'
import { Route, Routes } from 'react-router'
import * as endpoints from '@common/consts/endpoints'
import StationsFiltersPage from '@pages/stationsFilters/Filters'
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
			<Route path='*' element={<MainPage />} />
		</Routes>
	)
}
