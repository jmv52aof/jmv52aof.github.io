import { RequestQuery } from '@common/types/requests'
import {
	GetChargingSessionByIdRequestOptions,
	GetChargingSessionsRequestOptions,
	StopChargingSessionRequestOptions,
} from './types/request'
import { convertChargingSessionStatus } from './lib/converters'
import { convertConnectorStandard } from 'api/stations/lib/converters'
import {
	GetChargingSessionByIdResponse,
	GetChargingSessionsResponse,
	StopChargingSessionResponse,
} from './types/response'
import { sendRequest } from '@common/functions/requests'
import { CHARGING_SESSIONS_URL } from '@common/consts/urls'
import { createQueryString } from '@common/functions/strings'

const getQueryArgumentsForChargingSessions = (
	options: GetChargingSessionsRequestOptions
): RequestQuery[] => {
	const query: RequestQuery[] = []
	if (undefined !== options.priceGreaterThan)
		query.push({ key: 'priceGreaterThan', value: options.priceGreaterThan })
	if (undefined !== options.totalHoursGreaterThan)
		query.push({
			key: 'totalHoursGreaterThan',
			value: options.totalHoursGreaterThan,
		})
	if (undefined !== options.status)
		query.push({
			key: 'status',
			value: convertChargingSessionStatus(options.status),
		})
	if (options.standards?.length)
		query.push({
			key: 'standards',
			value: options.standards
				.map(value => convertConnectorStandard(value))
				.join(','),
		})
	if (undefined !== options.limit)
		query.push({ key: 'limit', value: options.limit })
	if (undefined !== options.offset)
		query.push({ key: 'offset', value: options.offset })
	return query
}

/**
 * Получение всех зарядных сессий
 */
export const getChargingSessions = async (
	options: GetChargingSessionsRequestOptions
): Promise<GetChargingSessionsResponse> => {
	return sendRequest({
		url:
			CHARGING_SESSIONS_URL +
			createQueryString(getQueryArgumentsForChargingSessions(options)),
		method: 'GET',
		token: options.token,
	})
}

/**
 * Получение зарядной сессии по ID
 */
export const getChargingSessionById = async (
	options: GetChargingSessionByIdRequestOptions
): Promise<GetChargingSessionByIdResponse> => {
	return sendRequest({
		url: CHARGING_SESSIONS_URL + options.id,
		method: 'GET',
		token: options.token,
	})
}

/**
 * Остановка активной зарядки по id
 */
export const stopChargingSession = async (
	options: StopChargingSessionRequestOptions
): Promise<StopChargingSessionResponse> => {
	return sendRequest({
		url: CHARGING_SESSIONS_URL + options.id + '/stop/',
		method: 'POST',
		token: options.token,
	})
}
