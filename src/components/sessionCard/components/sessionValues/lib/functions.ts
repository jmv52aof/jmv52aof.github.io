import { Timestamp } from '@common/types/date'

export const calculateDuration = (
	start: Timestamp,
	end?: Timestamp
): string => {
	if (!end) return 'Неизвестно'

	const startDate = new Date(
		start.year,
		start.month - 1,
		start.day,
		start.hours,
		start.minutes,
		start.seconds
	)

	const endDate = new Date(
		end.year,
		end.month - 1,
		end.day,
		end.hours,
		end.minutes,
		end.seconds
	)

	const diffMs = endDate.getTime() - startDate.getTime()
	if (diffMs <= 0) return '-'

	const diffMinutes = Math.floor(diffMs / 60000)
	const hours = Math.floor(diffMinutes / 60)
	const minutes = diffMinutes % 60

	return `${hours}ч ${minutes}м`
}
