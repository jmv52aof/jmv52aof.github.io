import { GET_DATA_LIMIT } from '@common/consts/app'
import { StationStatuses } from '@common/consts/stations'
import { useApi } from '@common/hooks/api'
import { RootStateContext } from 'contexts/RootStateContext'
import { useContext } from 'react'

export const useStationsLoader = () => {
	const { getStationsFromApi } = useApi()
	const { stationFilters } = useContext(RootStateContext)

	const getRequestOptions = () => {
		return {
			minElectricPower: stationFilters.minimalPower,
			standards: stationFilters.connectors,
			stationStatus: stationFilters.onlyAvailableStations
				? StationStatuses.AVAILABLE
				: undefined,
			limit: GET_DATA_LIMIT,
		}
	}

	/** Получение станций по заданным параметрам отступа и лимита */
	const getByOffsetAndLimit = (offset: number, limit: number) => {
		return getStationsFromApi({
			...getRequestOptions(),
			offset: offset,
			limit: limit,
		})
	}

	return {
		getByOffsetAndLimit,
	}
}
