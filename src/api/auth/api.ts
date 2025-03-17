import { sendRequest } from '@common/functions/requests'
import { AuthorizationTelegramUserRequestOptions } from './types/request'
import { AuthorizationTelegramUserResponse } from './types/response'
import { AUTHORIZATION_URL } from '@common/consts/urls'

/**
 * Авторизация по данным telegram
 */
export const authorizationTelegramUser = async (
	options: AuthorizationTelegramUserRequestOptions
): Promise<AuthorizationTelegramUserResponse> => {
	return sendRequest({
		url: AUTHORIZATION_URL,
		method: 'POST',
		content: options.userInitData,
	})
}
