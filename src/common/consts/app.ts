import { CONNECTORS } from '@common/consts/stations'
import { RootState } from '@common/types/app'

export const DEFAULT_ROOT_STATE: RootState = {
	sessionFilters: {
		connectors: [...CONNECTORS],
		onlyAvailableSessions: false,
		minimalPower: 0,
		isModified: false,
		shouldUpdateSession: true,
	},
	stations: [],
}

export const GET_DATA_LIMIT = 4
