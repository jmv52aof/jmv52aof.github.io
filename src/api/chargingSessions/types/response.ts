import { ResponseError } from '@common/types/requests'
import { ChargingSessionResponseDto } from './dto'

export interface GetChargingSessionsResponse {
	data?: ChargingSessionResponseDto[]
	error?: ResponseError
}

export interface GetChargingSessionByIdResponse {
	data?: ChargingSessionResponseDto
	error?: ResponseError
}
