import { createContext } from 'react'
import { DEFAULT_ROOT_STATE } from '@common/consts/app'
import { IRootStateContext } from '@common/types/app'

export const RootStateContext = createContext<IRootStateContext>({
	...DEFAULT_ROOT_STATE,
	setStationFilters: _ => {},
	setStations: _ => {},
	setSessionFilters: _ => {},
	setSessions: _ => {},
	showSnackbar: _ => {},
	setPosition: _ => {},
	setRfidCard: _ => {},
	setPaymentMethod: _ => {},
	setMapViewState: _ => {},
	setGeolocationRejected: _ => {},
	setLastStoppedChargingSessionId: _ => {}
})
