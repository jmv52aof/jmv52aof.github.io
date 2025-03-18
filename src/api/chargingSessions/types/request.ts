import {
	AuthorizationRequestOptions,
	PaginationRequestOptions,
} from '@common/types/requests'
import { ConnectorStandard } from '@common/types/stations'
import { ChargingSessionStatus } from '@common/types/chargingSessions'

export interface GetChargingSessionsRequestOptions
	extends PaginationRequestOptions,
		AuthorizationRequestOptions {
	priceGreaterThan?: number
	totalHoursGreaterThan?: number
	standards?: ConnectorStandard[]
	status?: ChargingSessionStatus
}

export interface GetChargingSessionByIdRequestOptions
	extends AuthorizationRequestOptions {
	id: number
}

export interface StopChargingSessionRequestOptions
	extends AuthorizationRequestOptions {
	id: string
}
