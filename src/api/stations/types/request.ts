import {
	AuthorizationRequestOptions,
	PaginationRequestOptions,
} from '@common/types/requests'
import { ConnectorStandardResponse, StationStatusResponse } from './dto'

export interface GetStationsRequestOptions
	extends PaginationRequestOptions,
		AuthorizationRequestOptions {
	partOfName?: string
	minElectricPower?: number
	stationStatus?: StationStatusResponse
	standards?: ConnectorStandardResponse[]
	latitude?: string
	longitude?: string
}

export interface GetStationByIdRequestOptions
	extends AuthorizationRequestOptions {
	id: number
}
