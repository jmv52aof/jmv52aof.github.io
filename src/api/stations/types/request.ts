import {
	AuthorizationRequestOptions,
	PaginationRequestOptions,
} from '@common/types/requests'
import { ConnectorStandard, StationStatus } from '@common/types/stations'

export interface GetStationsRequestOptions
	extends PaginationRequestOptions,
		AuthorizationRequestOptions {
	partOfName?: string
	minElectricPower?: number
	stationStatus?: StationStatus
	standards?: ConnectorStandard[]
	latitude?: string
	longitude?: string
}

export interface GetStationByIdRequestOptions
	extends AuthorizationRequestOptions {
	id: number
}
