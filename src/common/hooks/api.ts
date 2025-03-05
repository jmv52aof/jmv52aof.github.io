import { StationDto } from '@common/types/stations'
import { getStationById, getStations } from 'api/stations/api'
import { convertResponseStationDto } from 'api/stations/lib/converters'
import {
	GetStationByIdRequestOptions,
	GetStationsRequestOptions,
} from 'api/stations/types/request'

/** Хук предоставляет доступ к серверному API */
export const useApi = () => {
	const getStationsFromApi = async (
		options: GetStationsRequestOptions
	): Promise<StationDto[]> => {
		const response = await getStations({ ...options, token: undefined })
		if (response.data)
			return response.data.map(value => convertResponseStationDto(value))
		return []
	}

	const getStationByIdFromApi = async (
		options: GetStationByIdRequestOptions
	): Promise<StationDto | undefined> => {
		const response = await getStationById({ ...options, token: undefined })
		if (response.data) return convertResponseStationDto(response.data)
		return undefined
	}

	return {
		getStationsFromApi,
		getStationByIdFromApi,
	}
}
