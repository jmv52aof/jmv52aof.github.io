import { Route, Routes } from 'react-router'
import * as endpoints from '@common/consts/endpoints'
import StationsPage from '@pages/stations/Stations'
import StationProfilePage from '@pages/stationProfile/StationProfile'
import StationsFiltersPage from '@pages/stationsFilters/Filters'

export default function AppRouter(): React.JSX.Element {
	return (
		<Routes>
			<Route
				path={endpoints.STATIONS_FILTERS_ENDPOINT}
				element={<StationsFiltersPage />}
			/>
			<Route
				path={endpoints.STATIONS_LIST_ENDPOINT}
				element={<StationsPage />}
			/>
			<Route
				path={endpoints.STATION_PROFILE_ENDPOINT}
				element={<StationProfilePage />}
			/>
			<Route path='*' element={<StationsPage />} />
		</Routes>
	)
}
