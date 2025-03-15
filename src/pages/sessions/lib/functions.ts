import { ChargingSessionDto } from '@common/types/chargingSessions'
import { timestampToDate } from '@common/functions/date'

/**
 * Функция группирует сессии по дате и сортирует их по убыванию (относительно временной метки).
 *
 * @param sessions - Массив сессий, каждая из которых содержит дату начала в формате Timestamp.
 * @returns - Объект, где ключами являются строки с датами в формате "day mounth",
 * а значениями — массивы сессий, отсортированные по убыванию даты начала сессии.
 */

export const groupSessionsByDate = (sessions: ChargingSessionDto[]) => {
	const sortedSessions = [...sessions].sort((a, b) => {
		const dateA = timestampToDate(a.start_date)
		const dateB = timestampToDate(b.start_date)
		return dateB.getTime() - dateA.getTime()
	})

	const groupedSessions = sortedSessions.reduce<
		Record<string, ChargingSessionDto[]>
	>((acc, session) => {
		const sessionDate = timestampToDate(session.start_date)
		const dateKey = new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}).format(sessionDate)

		if (!acc[dateKey]) {
			acc[dateKey] = []
		}
		acc[dateKey].push(session)

		return acc
	}, {})

	Object.keys(groupedSessions).forEach(dateKey => {
		groupedSessions[dateKey].sort((a, b) =>
			a.status === 'Зарядка' ? -1 : 1
		)
	})

	return groupedSessions
}
