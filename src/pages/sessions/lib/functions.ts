import { ChargingSessionDto } from '@common/types/chargingSessions'

/**
 * Группировка и сортировка сессий по дате
 */
const formatDate = (day: number, month: number, year: number) => {
	const date = new Date(year, month - 1, day)
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
	}).format(date)
}

export const groupSessionsByDate = (sessions: ChargingSessionDto[]) => {
	const sortedSessions = [...sessions].sort((a, b) => {
		const dateA = new Date(
			a.start_date.year,
			a.start_date.month - 1,
			a.start_date.day
		)
		const dateB = new Date(
			b.start_date.year,
			b.start_date.month - 1,
			b.start_date.day
		)
		return dateB.getTime() - dateA.getTime()
	})

	return sortedSessions.reduce<Record<string, ChargingSessionDto[]>>(
		(acc, session) => {
			const dateKey = formatDate(
				session.start_date.day,
				session.start_date.month,
				session.start_date.year
			)
			if (!acc[dateKey]) {
				acc[dateKey] = []
			}
			acc[dateKey].push(session)
			return acc
		},
		{}
	)
}
