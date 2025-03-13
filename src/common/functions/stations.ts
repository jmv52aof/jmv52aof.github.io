import { DECIMAL_IN_MAX_POWER, StationStatuses } from '@common/consts/stations'
import { ConnectorDto, StationFilters } from '@common/types/stations'

export const getMaxPowerForConnector = (connector: ConnectorDto): number => {
	return (
		Math.round((connector.max_electric_power / 1000) * DECIMAL_IN_MAX_POWER) /
		DECIMAL_IN_MAX_POWER
	)
}

export const createGetStationsRequestOptions = (filters: StationFilters) => {
	return {
		minElectricPower: filters.minimalPower,
		standards: filters.connectors,
		stationStatus: filters.onlyAvailableStations
			? StationStatuses.AVAILABLE
			: undefined,
	}
}
