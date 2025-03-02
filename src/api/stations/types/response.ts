import { ResponseError } from '@common/types/requests'
import { StationResponseDto } from './dto'

export interface GetStationsResponse {
	data?: StationResponseDto[]
	error?: ResponseError
}

export interface GetStationByIdResponse {
	data?: StationResponseDto
	error?: ResponseError
}
