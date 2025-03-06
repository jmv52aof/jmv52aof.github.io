import AppRouter from './router/AppRouter'
import { useState } from 'react'
import { RootState } from '@common/types/app'
import { DEFAULT_ROOT_STATE } from '@common/consts/app'
import { RootStateContext } from 'contexts/RootStateContext'

export default function App() {
	const [rootState, setRootState] = useState<RootState>(DEFAULT_ROOT_STATE)

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
					setRootState({ ...rootState, stations: stations }),
			}}
		>
			<AppRouter />
		</RootStateContext.Provider>
	)
}
