import { AuthorizationRequestOptions } from '@common/types/requests'

export interface RetryPaymentForChargingSessionRequestOptions
	extends AuthorizationRequestOptions {
	sessionId: string
}

export interface CreatePaymentMethodRequestOptions
	extends AuthorizationRequestOptions {}

export interface GetPaymentMethodRequestOptions
	extends AuthorizationRequestOptions {}

export interface GetPaymentUrlRequestOptions
	extends AuthorizationRequestOptions {}

export interface DeletePaymentMethodRequestOptions
	extends AuthorizationRequestOptions {}
