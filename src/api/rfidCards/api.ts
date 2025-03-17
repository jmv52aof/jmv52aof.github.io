import { sendRequest } from '@common/functions/requests'
import {
	AttachRfidCardRequestOptions,
	DetachRfidCardRequestOptions,
	GetRfidCardRequestOptions,
} from './types/request'
import {
	AttachRfidCardResponse,
	DetachRfidCardResponse,
	GetRfidCardResponse,
} from './types/response'
import { RFID_CARD_URL } from '@common/consts/urls'
import { createQueryString } from '@common/functions/strings'

export const getRfidCard = async (
	options: GetRfidCardRequestOptions
): Promise<GetRfidCardResponse> => {
	return sendRequest({
		url: RFID_CARD_URL,
		method: 'GET',
		token: options.token,
	})
}

/**
 * Привязка RFID карты к пользователю (определяется токеном) по визуальному номеру
 */
export const attachRfidCard = async (
	options: AttachRfidCardRequestOptions
): Promise<AttachRfidCardResponse> => {
	return sendRequest({
		url:
			RFID_CARD_URL +
			'attach/' +
			createQueryString([
				{ key: 'visualCardNumber', value: options.visualCardNumber },
			]),
		method: 'PUT',
		token: options.token,
	})
}

/**
 * Открепление RFID карты от пользователя (определяется токеном) по визуальному номеру
 */
export const detachRfidCard = async (
	options: DetachRfidCardRequestOptions
): Promise<DetachRfidCardResponse> => {
	return sendRequest({
		url:
			RFID_CARD_URL +
			'detach/' +
			createQueryString([
				{ key: 'visualCardNumber', value: options.visualCardNumber },
			]),
		method: 'DELETE',
		token: options.token,
	})
}
