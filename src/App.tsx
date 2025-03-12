import AppRouter from './router/AppRouter'
import { useState } from 'react'
import { RootState } from '@common/types/app'
import { DEFAULT_ROOT_STATE } from '@common/consts/app'
import { RootStateContext } from 'contexts/RootStateContext'

export default function App() {
	const [rootState, setRootState] = useState<RootState>(DEFAULT_ROOT_STATE)

	console.log(rootState)

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
			}}
		>
			<AppRouter />
		</RootStateContext.Provider>
	)
}
