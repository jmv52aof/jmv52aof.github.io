import AppRouter from './router/AppRouter'
import { useEffect, useState } from 'react'
import { RootState } from '@common/types/app'
import { DEFAULT_ROOT_STATE } from '@common/consts/app'
import { RootStateContext } from 'contexts/RootStateContext'
import { useSnackbar } from '@common/hooks/snackbar'

export default function App() {
	const [rootState, setRootState] = useState<RootState>(DEFAULT_ROOT_STATE)
	const { snackbar, showSnackbar } = useSnackbar()

	window.addEventListener("offline", function () {
		showSnackbar("error", "Потеряна связь с сервером!");
	});
  
	window.addEventListener("online", function () {
		showSnackbar('success', "Соединение восстановлено")
	});

	console.log(window.Telegram.WebApp.initData)
	
	return (
		<RootStateContext.Provider
			value={{
				...rootState,
				setStationFilters: filters =>
					setRootState({
						...rootState,
						stationFilters: filters,
					}),
				setStations: stations =>
					setRootState({
						...rootState,
						stations: stations,
						stationFilters: {
							...rootState.stationFilters,
							shouldUpdateStations: false,
						},
					}),
				setSessionFilters: filters =>
					setRootState({
						...rootState,
						sessionFilters: filters,
					}),
				setSessions: sessions =>
					setRootState({
						...rootState,
						sessions: sessions,
						sessionFilters: {
							...rootState.sessionFilters,
							shouldUpdateSessions: false,
						},
					}),
				showSnackbar,
				setRfidCard: card => setRootState({ ...rootState, rfidCard: card }),
				setPaymentMethod: method =>
					setRootState({ ...rootState, paymentMethod: method }),
				setPosition: position =>
					setRootState({
						...rootState,
						position: position,
					}),
				setMapViewState: viewState =>
					setRootState({ ...rootState, mapViewState: viewState }),
				setLastStoppedChargingSessionId: id =>
					setRootState({ ...rootState, lastStoppedChargingSessionId: id }),
			}}
		>
			{snackbar}
			<AppRouter />
		</RootStateContext.Provider>
	)
}
