import { ChargingSessionDto } from '@common/types/chargingSessions'
import { StationDto } from '@common/types/stations'
import {
	getChargingSessionById,
	getChargingSessions,
} from 'api/chargingSessions/api'
import { convertChargingSessionResponseDto } from 'api/chargingSessions/lib/converters'
import {
	GetChargingSessionByIdRequestOptions,
	GetChargingSessionsRequestOptions,
} from 'api/chargingSessions/types/request'
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

	const getChargingSessionsFromApi = async (
		options: GetChargingSessionsRequestOptions
	): Promise<ChargingSessionDto[]> => {
		const response = await getChargingSessions({ ...options, token: undefined })
		if (response.data)
			return response.data.map(value =>
				convertChargingSessionResponseDto(value)
			)
		return []
	}

	const getChargingSessionByIdFromApi = async (
		options: GetChargingSessionByIdRequestOptions
	): Promise<ChargingSessionDto | undefined> => {
		const response = await getChargingSessionById({
			...options,
			token: undefined,
		})
		if (response.data) return convertChargingSessionResponseDto(response.data)
		return undefined
	}

	return {
		getStationsFromApi,
		getStationByIdFromApi,
		getChargingSessionsFromApi,
		getChargingSessionByIdFromApi,
	}
}
