import { ResponseError } from '@common/types/requests'

export interface RetryPaymentForChargingSessionResponse {
	error?: ResponseError
}

export interface CreatePaymentMethodResponse {
	error?: ResponseError
}

export interface GetPaymentMethodResponse {
	data?: string
	error?: ResponseError
}

export interface GetPaymentUrlResponse {
	data?: string
	error?: ResponseError
}

export interface DeletePaymentMethodResponse {
	error?: ResponseError
}
