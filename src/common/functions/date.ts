import { Timestamp } from '@common/types/date'

/**
 * Функция возвращает строковое представление временно́го числа
 * Если входное число меньше 10, функция добавляет ведущий ноль,
 * чтобы получить двухзначное число. Например, если передать число 5, функция вернет строку "05".
 * Если передать число 15, функция вернет строку "15".
 *
 * @param timeNumber - временно́е число
 * @returns строковое представление временно́го числа
 */
const formatTimeNumber = (timeNumber: number): string => {
	return timeNumber < 10 ? `0${timeNumber}` : `${timeNumber}`
}

/**
 * Функция создает объект Date на основе переданных значений часов, минут и секунд.
 *
 * @param timestamp - Объект, содержащий поля hours, minutes и seconds.
 * @returns - Объект Date с установленными часами, минутами и секундами.
 */
const timeToDate = (timestamp: Timestamp): Date => {
	const date = new Date()
	date.setHours(timestamp.hours, timestamp.minutes, timestamp.seconds)
	return date
}

/**
 * Преобразует объект Date в объект Timestamp
 *
 * @param date - Объект Date, который необходимо преобразовать.
 * @returns - Объект Timestamp, преобразованный из date.
 */
export const dateToTimestamp = (date: Date): Timestamp => {
	return {
		year: date.getUTCFullYear(),
		month: date.getUTCMonth() + 1,
		day: date.getUTCDate(),
		hours: date.getUTCHours(),
		minutes: date.getUTCMinutes(),
		seconds: date.getUTCSeconds(),
	}
}

/**
 * Преобразует часы, минуты и секунды в строку в формате ISO 8601 (HH:MM:SS).
 *
 * @param hours - Количество часов.
 * @param minutes - Количество минут.
 * @param seconds - Количество секунд.
 * @returns - Строка в формате ISO 8601 (HH:MM:SS).
 */
export const timeToISOString = (
	hours: number,
	minutes: number,
	seconds: number
): string => {
	return `${formatTimeNumber(hours)}:${formatTimeNumber(
		minutes
	)}:${formatTimeNumber(seconds)}`
}

/**
 * Преобразует часы, минуты и секунды в строку с единицами измерения (ч, м, сек).
 *
 * @param hours - Количество часов.
 * @param minutes - Количество минут.
 * @param seconds - Количество секунд.
 * @returns - Строка с единицами измерения (ч, м, сек).
 */
export const timeToStringWithUnitsOfMeasurement = (
	hours: number,
	minutes: number,
	seconds: number
): string => {
	return `${hours === 0 ? '' : `${hours}ч`} ${
		minutes === 0 ? '' : `${minutes}м`
	} ${seconds === 0 ? '' : `${seconds}сек`}`
}

/**
 * Вычисляет разницу между двумя временными метками в формате Timestamp.
 * В случае если первый параметр меньше второго, то время первого вычитается из второго
 *
 * @param  reduced - Первый объект Timestamp, от которого вычитается время.
 * @param  subtracted - Второй объект Timestamp, время которого вычитается.
 * @returns - Объект Timestamp, содержащий разницу в годах, месяцах, днях, часах, минутах и секундах.
 */
export const getTimesDifference = (
	reduced: Timestamp,
	subtracted: Timestamp
): Timestamp => {
	const reducedTime = timeToDate(reduced).getTime()
	const subtractedTime = timeToDate(subtracted).getTime()
	return dateToTimestamp(
		new Date(
			reducedTime < subtractedTime
				? subtractedTime - reducedTime
				: reducedTime - subtractedTime
		)
	)
}
