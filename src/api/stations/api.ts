import { sendRequest } from '@common/functions/requests'
import {
	GetStationByIdRequestOptions,
	GetStationsRequestOptions,
} from './types/request'
import { RequestQuery } from '@common/types/requests'
import { STATIONS_URL } from '@common/consts/urls'
import { createQueryString } from '@common/functions/strings'
import { GetStationByIdResponse, GetStationsResponse } from './types/response'
import {
	convertConnectorStandard,
	convertStationStatus,
} from './lib/converters'

const getQueryArgumentsForStations = (
	options: GetStationsRequestOptions
): RequestQuery[] => {
	const query: RequestQuery[] = []
	if (undefined !== options.partOfName)
		query.push({ key: 'partOfName', value: options.partOfName })
	if (undefined !== options.latitude)
		query.push({ key: 'latitude', value: options.latitude })
	if (undefined !== options.longitude)
		query.push({ key: 'longitude', value: options.longitude })
	if (undefined !== options.stationStatus)
		query.push({
			key: 'stationStatus',
			value: convertStationStatus(options.stationStatus),
		})
	if (undefined !== options.minElectricPower)
		query.push({ key: 'minElectricPower', value: options.minElectricPower })
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

const getQueryArgumentsForStation = (
	options: GetStationByIdRequestOptions
): RequestQuery[] => {
	const query: RequestQuery[] = []
	if (undefined !== options.latitude)
		query.push({ key: 'latitude', value: options.latitude })
	if (undefined !== options.longitude)
		query.push({ key: 'longitude', value: options.longitude })
	return query
}

/**
 * Получение всех станций
 */
export const getStations = async (
	options: GetStationsRequestOptions
): Promise<GetStationsResponse> => {
	return sendRequest({
		url:
			STATIONS_URL + createQueryString(getQueryArgumentsForStations(options)),
		method: 'GET',
		token: options.token,
	})
}

/**
 * Получение станции по ID
 */
export const getStationById = async (
	options: GetStationByIdRequestOptions
): Promise<GetStationByIdResponse> => {
	return sendRequest({
		url:
			STATIONS_URL +
			options.id +
			createQueryString(getQueryArgumentsForStation(options)),
		method: 'GET',
		token: options.token,
	})
}
