import { Route, Routes } from 'react-router'
import * as endpoints from '@common/consts/endpoints'
import StationsPage from '@pages/stations/Stations'
import StationProfilePage from '@pages/stationProfile/StationProfile'
import StationsFiltersPage from '@pages/stationsFilters/Filters'
import SessionsFiltersPage from '@pages/sessionsFilters/SessionsFilters'
import SessionsPage from '@pages/sessions/Sessions'
import ChargingSessionPage from '@pages/chargingSession/ChargingSession'
import MainPage from '@pages/main/Main'
import PaymentMethodPage from '@pages/paymentMethod/PaymentMethod'
import RfidCardPage from '@pages/rfidCard/RfidCard'
import AddRfidCardPage from '@pages/addRfidCard/AddRfidCard'

export default function AppRouter(): React.JSX.Element {
	return (
		<Routes>
			<Route
				path={endpoints.STATIONS_FILTERS_ENDPOINT}
				element={<StationsFiltersPage />}
			/>
			<Route
				path={endpoints.SESSIONS_HISTORY_FILTERS_ENDPOINT}
				element={<SessionsFiltersPage />}
			/>
			<Route
				path={endpoints.STATIONS_LIST_ENDPOINT}
				element={<StationsPage />}
			/>
			<Route
				path={`${endpoints.STATION_PROFILE_ENDPOINT}:id`}
				element={<StationProfilePage />}
			/>
			<Route
				path={endpoints.SESSIONS_HISTORY_ENDPOINT}
				element={<SessionsPage />}
			/>
			<Route
				path={`${endpoints.SESSION_PROFILE_ENDPOINT}:id`}
				element={<ChargingSessionPage />}
			/>
			<Route
				path={endpoints.PAYMENT_METHOD_ENDPOINT}
				element={<PaymentMethodPage />}
			/>
			<Route path={endpoints.RFID_CARD_ENDPOINT} element={<RfidCardPage />} />
			<Route
				path={endpoints.ADD_RFID_CARD_ENDPOINT}
				element={<AddRfidCardPage />}
			/>
			<Route path='*' element={<MainPage />} />
		</Routes>
	)
}
