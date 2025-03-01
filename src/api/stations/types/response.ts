import { ResponseError } from '@common/types/requests'
import { StationDto } from './dto'

export interface GetStationsResponse {
	data?: StationDto[]
	error?: ResponseError
}

export interface GetStationByIdResponse {
	data?: StationDto
	error?: ResponseError
}
