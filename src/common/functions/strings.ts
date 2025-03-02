import { RequestQuery } from '@common/types/requests'

/** Создаёт строку с query аргументами для запроса */
export const createQueryString = (queryArgs: RequestQuery[]): string => {
	if (!queryArgs.length) return ''

	return (
		'?' +
		queryArgs
			.map(arg => {
				return arg.value !== undefined
					? `${arg.key}=${encodeURIComponent(arg.value)}`
					: undefined
			})
			.filter(value => value !== undefined)
			.join('&')
	)
}
