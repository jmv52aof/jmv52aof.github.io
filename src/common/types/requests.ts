export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestOptions = {
	/** Урл для запроса */
	url: string
	/** Метод запроса */
	method: RequestMethod
	/** Токен в заголовке авторизации */
	token?: string
	/** Тело запроса */
	content?: any
	/** Если в `content` передаются файлы, то данный флаг должен иметь значение `true` */
	isFiles?: boolean
	/** Если запрос следует выполнить в фоне браузера при его закрытии, то выставить `true` */
	keepalive?: boolean
	/** Указывает на строку в ответе вместо привычного формата JSON */
	responseIsString?: boolean
}

export type ResponseError = {
	status: number
	error: string
	message: string
}

export type ResponseData = {
	data?: any
	error?: ResponseError
}

export type AuthorizationRequestOptions = {
	token?: string
}

export type PaginationRequestOptions = {
	offset?: number
	limit?: number
}

export type RequestQuery = {
	key: string
	value: any
}
