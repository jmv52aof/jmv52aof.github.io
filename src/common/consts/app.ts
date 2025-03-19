import { CONNECTORS } from '@common/consts/stations'
import { RootState } from '@common/types/app'

export const DEFAULT_ROOT_STATE: RootState = {
	stationFilters: {
		connectors: [...CONNECTORS],
		onlyAvailableStations: false,
		minimalPower: 0,
		isModified: false,
		partOfName: '',
		shouldUpdateStations: true,
	},
	stations: [],
	sessionFilters: {
		connectors: [...CONNECTORS],
		onlyPaidSessions: false,
		durationInHours: 0,
		isModified: false,
		shouldUpdateSessions: true,
	},
	sessions: [],
	position: undefined,
	isInitTelegramSdk: undefined,
}

export const GET_DATA_LIMIT = 15
