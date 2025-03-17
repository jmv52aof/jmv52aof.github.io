import { createContext } from 'react'
import { DEFAULT_ROOT_STATE } from '@common/consts/app'
import { IRootStateContext } from '@common/types/app'

export const RootStateContext = createContext<IRootStateContext>({
	...DEFAULT_ROOT_STATE,
	setStationFilters: _ => {},
	setStations: _ => {},
	setPosition: _ => {},
	setRfidCard: _ => {},
})
