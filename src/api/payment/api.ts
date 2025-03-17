import { sendRequest } from '@common/functions/requests'
import {
	CreatePaymentMethodRequestOptions,
	DeletePaymentMethodRequestOptions,
	GetPaymentMethodRequestOptions,
	GetPaymentUrlRequestOptions,
	RetryPaymentForChargingSessionRequestOptions,
} from './types/request'
import {
	CreatePaymentMethodResponse,
	DeletePaymentMethodResponse,
	GetPaymentMethodResponse,
	GetPaymentUrlResponse,
	RetryPaymentForChargingSessionResponse,
} from './types/response'
import { PAYMENT_METHOD_URL, PAYMENT_URL } from '@common/consts/urls'

/**
 * Повторить попытку оплаты зарядной сессий (оплата задолженности)
 */
export const retryPaymentForChargingSession = async (
	options: RetryPaymentForChargingSessionRequestOptions
): Promise<RetryPaymentForChargingSessionResponse> => {
	return sendRequest({
		url: PAYMENT_URL + 'retry/' + options.sessionId,
		method: 'POST',
		token: options.token,
	})
}

/**
 * Инициализация добавления нового способа оплаты
 */
export const createPaymentMethod = async (
	options: CreatePaymentMethodRequestOptions
): Promise<CreatePaymentMethodResponse> => {
	return sendRequest({
		url: PAYMENT_METHOD_URL + 'new/',
		method: 'POST',
		token: options.token,
	})
}

/**
 * Получение способа оплаты
 */
export const getPaymentMethod = async (
	options: GetPaymentMethodRequestOptions
): Promise<GetPaymentMethodResponse> => {
	return sendRequest({
		url: PAYMENT_METHOD_URL,
		method: 'GET',
		token: options.token,
		responseIsString: true,
	})
}

/**
 * Получение URL для привязки способа оплаты через внешнюю систему
 */
export const getPaymentUrl = async (
	options: GetPaymentUrlRequestOptions
): Promise<GetPaymentUrlResponse> => {
	return sendRequest({
		url: PAYMENT_METHOD_URL + 'payurl/',
		method: 'GET',
		token: options.token,
		responseIsString: true,
	})
}

/**
 * Удаление способа оплаты
 */
export const deletePaymentMethod = async (
	options: DeletePaymentMethodRequestOptions
): Promise<DeletePaymentMethodResponse> => {
	return sendRequest({
		url: PAYMENT_METHOD_URL + 'detach/',
		method: 'DELETE',
		token: options.token,
	})
}
