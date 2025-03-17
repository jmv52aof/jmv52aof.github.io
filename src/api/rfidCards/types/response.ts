import { ResponseError } from '@common/types/requests'
import { RfidCardResponseDto } from './dto'

export interface GetRfidCardResponse {
	data?: RfidCardResponseDto
	error?: ResponseError
}

export interface AttachRfidCardResponse {
	error?: ResponseError
}

export interface DetachRfidCardResponse {
	error?: ResponseError
}
