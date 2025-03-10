import { Route, Routes } from 'react-router'
import * as endpoints from '@common/consts/endpoints'
import StationsPage from '@pages/stations/Stations'
import StationsFiltersPage from '@pages/stationsFilters/Filters'
import PaymentMethodPage from '@pages/paymentMethod/PaymentMethod'

export default function AppRouter(): React.JSX.Element {
	return (
		<Routes>
			<Route
				path={endpoints.STATIONS_FILTERS_ENDPOINT}
				element={<StationsFiltersPage />}
			/>
			<Route
				path={endpoints.PAYMENT_METHOD_ENDPOINT}
				element={<PaymentMethodPage />}
			/>
			<Route
				path={endpoints.STATIONS_LIST_ENDPOINT}
				element={<StationsPage />}
			/>
			<Route path='*' element={<StationsPage />} />
		</Routes>
	)
}
