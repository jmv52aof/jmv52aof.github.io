import AppRouter from './router/AppRouter'
import { useEffect, useState } from 'react'
import { RootState } from '@common/types/app'
import { DEFAULT_ROOT_STATE } from '@common/consts/app'
import { RootStateContext } from 'contexts/RootStateContext'
import { useSnackbar } from '@common/hooks/snackbar'
import { initializeMockEnvironment } from '@common/functions/telegram'
import { backButton, init, miniApp } from '@telegram-apps/sdk-react'
import BackButton from '@components/ui/backButton/BackButton'

if (import.meta.env.DEV) initializeMockEnvironment()

export default function App() {
	const [rootState, setRootState] = useState<RootState>(DEFAULT_ROOT_STATE)
	const { snackbar, showSnackbar } = useSnackbar()

	try {
		if (rootState.isInitTelegramSdk === undefined) {
			init()
			setRootState({
				...rootState,
				isInitTelegramSdk: true,
			})
		}
	} catch (e) {
		console.error('Ошибка инициализации teleram sdk:', e)
		setRootState({
			...rootState,
			isInitTelegramSdk: false,
		})
	}

	if (
		rootState.isInitTelegramSdk &&
		!miniApp.isMounting &&
		!miniApp.isMounted()
	)
		miniApp.mount()
	useEffect(() => {
		if (rootState.isInitTelegramSdk && !backButton.isMounted())
			backButton.mount()
	}, [])

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
							shouldUpdateSession: false,
						},
					}),
				showSnackbar,
				setRfidCard: card => setRootState({ ...rootState, rfidCard: card }),
				setActiveChargingSession: session =>
					setRootState({ ...rootState, activeChargingSession: session }),
				setPaymentMethod: method =>
					setRootState({ ...rootState, paymentMethod: method }),
				setPosition: position =>
					setRootState({
						...rootState,
						position: position,
					}),
			}}
		>
			{rootState.isInitTelegramSdk && <BackButton />}
			{snackbar}
			<AppRouter />
		</RootStateContext.Provider>
	)
}
