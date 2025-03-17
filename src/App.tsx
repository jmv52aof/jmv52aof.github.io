import AppRouter from './router/AppRouter'
import { useState } from 'react'
import { RootState } from '@common/types/app'
import { DEFAULT_ROOT_STATE } from '@common/consts/app'
import { RootStateContext } from 'contexts/RootStateContext'
import { useSnackbar } from '@common/hooks/snackbar'

export default function App() {
	const [rootState, setRootState] = useState<RootState>(DEFAULT_ROOT_STATE)
	const { snackbarText, snackbarVariant, isVisible, showSnackbar } =
		useSnackbar('success', '')

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
				snackbarText,
				snackbarVariant,
				isSnackbarVisible: isVisible,
				showSnackbar,
			}}
		>
			<AppRouter />
		</RootStateContext.Provider>
	)
}
