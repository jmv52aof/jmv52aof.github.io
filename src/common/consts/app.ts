import { CONNECTORS } from '@common/consts/stations'
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
}

export const GET_DATA_LIMIT = 15
