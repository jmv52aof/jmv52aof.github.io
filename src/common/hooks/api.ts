import { ChargingSessionDto } from '@common/types/chargingSessions'
import { ResponseError } from '@common/types/requests'
import { RfidCardDto } from '@common/types/rfidCards'
import { StationDto } from '@common/types/stations'
import { authorizationTelegramUser } from 'api/auth/api'
import { AuthorizationTelegramUserRequestOptions } from 'api/auth/types/request'
import {
	getChargingSessionById,
	getChargingSessions,
	stopChargingSession,
} from 'api/chargingSessions/api'
import { convertChargingSessionResponseDto } from 'api/chargingSessions/lib/converters'
import {
	GetChargingSessionByIdRequestOptions,
	GetChargingSessionsRequestOptions,
	StopChargingSessionRequestOptions,
} from 'api/chargingSessions/types/request'
import {
	createPaymentMethod,
	deletePaymentMethod,
	getPaymentMethod,
	getPaymentUrl,
	retryPaymentForChargingSession,
} from 'api/payment/api'
import {
	CreatePaymentMethodRequestOptions,
	DeletePaymentMethodRequestOptions,
	GetPaymentMethodRequestOptions,
	GetPaymentUrlRequestOptions,
	RetryPaymentForChargingSessionRequestOptions,
} from 'api/payment/types/request'
import { attachRfidCard, detachRfidCard, getRfidCard } from 'api/rfidCards/api'
import { convertRfidCardResponseDto } from 'api/rfidCards/lib/converters'
import {
	AttachRfidCardRequestOptions,
	DetachRfidCardRequestOptions,
	GetRfidCardRequestOptions,
} from 'api/rfidCards/types/request'
import { getStationById, getStations } from 'api/stations/api'
import { convertResponseStationDto } from 'api/stations/lib/converters'
import {
	GetStationByIdRequestOptions,
	GetStationsRequestOptions,
} from 'api/stations/types/request'

/** Хук предоставляет доступ к серверному API */
export const useApi = () => {
	/** Модуль авторизации */

	const authorizationTelegramUserFromApi = async (
		options: AuthorizationTelegramUserRequestOptions
	): Promise<string | undefined> => {
		const response = await authorizationTelegramUser(options)
		if (response.data) return response.data.token
		return undefined
	}

	/** Модуль станций */

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

	/** Модуль зарядных сессий */

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

	const stopChargingSessionFromApi = async (
		options: StopChargingSessionRequestOptions
	): Promise<void> => {
		const response = await stopChargingSession({ ...options, token: undefined })
	}

	/** Модуль RFID карт */

	const getRfidCardFromApi = async (
		options: GetRfidCardRequestOptions
	): Promise<RfidCardDto | undefined> => {
		const response = await getRfidCard({ ...options, token: undefined })
		if (response.data) return convertRfidCardResponseDto(response.data)
		return undefined
	}

	const attachRfidCardFromApi = async (
		options: AttachRfidCardRequestOptions
	): Promise<ResponseError | undefined> => {
		const response = await attachRfidCard({ ...options, token: undefined })
		return response.error
	}

	const detachRfidCardFromApi = async (
		options: DetachRfidCardRequestOptions
	): Promise<void> => {
		const response = await detachRfidCard({ ...options, token: undefined })
	}

	/** Модуль оплаты */

	const retryPaymentForChargingSessionFromApi = async (
		options: RetryPaymentForChargingSessionRequestOptions
	): Promise<void> => {
		const response = await retryPaymentForChargingSession({
			...options,
			token: undefined,
		})
	}

	const createPaymentMethodFromApi = async (
		options: CreatePaymentMethodRequestOptions
	): Promise<void> => {
		const response = await createPaymentMethod({ ...options, token: undefined })
	}

	const getPaymentMethodFromApi = async (
		options: GetPaymentMethodRequestOptions
	): Promise<string | undefined> => {
		const response = await getPaymentMethod({ ...options, token: undefined })
		if (undefined !== response.data) return response.data
		return undefined
	}

	const getPaymentUrlFromApi = async (
		options: GetPaymentUrlRequestOptions
	): Promise<string | undefined> => {
		const response = await getPaymentUrl({ ...options, token: undefined })
		if (undefined !== response.data) return response.data
		return undefined
	}

	const deletePaymentMethodFromApi = async (
		options: DeletePaymentMethodRequestOptions
	): Promise<void> => {
		const response = await deletePaymentMethod({ ...options, token: undefined })
	}

	return {
		authorizationTelegramUserFromApi,
		getStationsFromApi,
		getStationByIdFromApi,
		getChargingSessionsFromApi,
		getChargingSessionByIdFromApi,
		stopChargingSessionFromApi,
		getRfidCardFromApi,
		attachRfidCardFromApi,
		detachRfidCardFromApi,
		retryPaymentForChargingSessionFromApi,
		createPaymentMethodFromApi,
		getPaymentMethodFromApi,
		getPaymentUrlFromApi,
		deletePaymentMethodFromApi,
	}
}
