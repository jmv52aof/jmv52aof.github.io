import { createContext } from 'react'
import { DEFAULT_ROOT_STATE } from '@common/consts/app'
import { IRootStateContext } from '@common/types/app'

export const RootStateContext = createContext<IRootStateContext>({
	...DEFAULT_ROOT_STATE,
	setStationFilters: () => {},
	setStations: () => {},
	showSnackbar: () => {},
	setPosition: _ => {},
	setRfidCard: _ => {},
	setActiveChargingSession: _ => {},
	setPaymentMethod: _ => {},
})
