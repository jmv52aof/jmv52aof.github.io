import { getStationById, getStations } from 'api/stations/api'
import {
	GetStationByIdRequestOptions,
	GetStationsRequestOptions,
} from 'api/stations/types/request'
import {
	GetStationByIdResponse,
	GetStationsResponse,
} from 'api/stations/types/response'

/** Хук предоставляет доступ к серверному API */
export const useApi = () => {
	const getStationsFromApi = (
		options: GetStationsRequestOptions
	): Promise<GetStationsResponse> => {
		return getStations({ ...options, token: undefined })
	}

	const getStationByIdFromApi = (
		options: GetStationByIdRequestOptions
	): Promise<GetStationByIdResponse> => {
		return getStationById({ ...options, token: undefined })
	}

	return {
		getStationsFromApi,
		getStationByIdFromApi,
	}
}
