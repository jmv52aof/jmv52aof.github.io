import {
	RequestOptions,
	ResponseData,
	ResponseError,
} from '@common/types/requests'

/**
 * Отправка запроса на сервер
 * @param options - параметры запроса
 * @returns объект/список объектов/ошибку
 */
export async function sendRequest(
	options: RequestOptions
): Promise<ResponseData> {
	const headers = new Headers()
	if (options.token) {
		headers.set('Authorization', 'Bearer ' + options.token)
	}

	const request: RequestInit = {
		method: options.method,
		headers: headers,
		keepalive: options.keepalive,
	}

	if (options.content) {
		if (options.isFiles) {
			request.body = options.content
		} else {
			request.body = JSON.stringify(options.content, (_, value) => {
				if (value !== null) return value
			})
			headers.set('Content-Type', 'application/json')
		}
	}

	try {
		const response = await fetch(options.url, request)

		let jsonResponse = undefined
		try {
			jsonResponse = await response.json()
		} catch (err) {}

		if (!jsonResponse) return {}

		const isError = 'error' in jsonResponse

		return {
			data: isError ? undefined : jsonResponse,
			error: isError
				? ({
						status: jsonResponse.status,
						error: jsonResponse.error,
						message: jsonResponse.message,
				  } as ResponseError)
				: undefined,
		}
	} catch (err) {
		return {
			error: {
				status: 500,
				error: 'InternalServerError',
				message: 'Ошибка выполнения запроса',
			} as ResponseError,
		}
	}
}
