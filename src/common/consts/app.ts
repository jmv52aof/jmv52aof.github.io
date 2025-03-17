import { CONNECTORS } from '@common/consts/stations'
import { CONNECTORS_SESSION } from '@common/consts/chargingSessions'
import { RootState } from '@common/types/app'

export const DEFAULT_ROOT_STATE: RootState = {
	stationFilters: {
		connectors: [...CONNECTORS],
		onlyAvailableStations: false,
		minimalPower: 0,
		isModified: false,
		shouldUpdateStations: true,
	},
	stations: [],
	sessionFilters: {
		connectors: [...CONNECTORS_SESSION],
		onlyAvailableSessions: false,
		minimalPower: 0,
		isModified: false,
		shouldUpdateSessions: true,
	},
	sessions: [],
}

export const GET_DATA_LIMIT = 4
