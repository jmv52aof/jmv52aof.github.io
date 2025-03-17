import { AuthorizationRequestOptions } from '@common/types/requests'

export interface GetRfidCardRequestOptions
	extends AuthorizationRequestOptions {}

export interface AttachRfidCardRequestOptions
	extends AuthorizationRequestOptions {
	visualCardNumber: string
}

export interface DetachRfidCardRequestOptions
	extends AuthorizationRequestOptions {
	visualCardNumber: string
}
