import { StationStatuses } from '@common/consts/stations'
import { Position } from '@common/types/position'
import { StationFilters } from '@common/types/stations'

export const createGetStationsRequestOptions = (
	filters: StationFilters,
	position?: Position | null
) => {
	return {
		minElectricPower: filters.minimalPower,
		standards: filters.connectors,
		stationStatus: filters.onlyAvailableStations
			? StationStatuses.AVAILABLE
			: undefined,
		latitude: position?.latitude.toString(),
		longitude: position?.longitude.toString(),
	}
}
