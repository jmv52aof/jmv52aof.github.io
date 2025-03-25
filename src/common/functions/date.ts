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
 * Функция создает объект Date на основе переданного Timestamp.
 *
 * @param timestamp - Объект Timestamp, который необходимо преобразовать.
 * @returns - Объект Date, преобразованный из Timestamp.
 */
export const timestampToDate = (timestamp: Timestamp): Date => {
	return new Date(
		timestamp.year,
		timestamp.month - 1,
		timestamp.day,
		timestamp.hours,
		timestamp.minutes,
		timestamp.seconds
	)
}

/**
 * Преобразует объект Date в объект Timestamp
 *
 * @param date - Объект Date, который необходимо преобразовать.
 * @returns Объект Timestamp, преобразованный из date.
 */
export const dateToTimestamp = (date: Date): Timestamp => {
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
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
	const result = `${hours === 0 ? '' : `${hours}ч`} ${
		minutes === 0 ? '' : `${minutes}м`
	} ${seconds === 0 ? '' : `${seconds}сек`}`

	return result.trim().length > 0 ? result : '0сек'
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
	const reducedTime = timestampToDate(reduced).getTime()
	const subtractedTime = timestampToDate(subtracted).getTime()
	const result = new Date(
		reducedTime < subtractedTime
			? subtractedTime - reducedTime
			: reducedTime - subtractedTime
	)

	return {
		year: 0,
		month: 0,
		day: 0,
		hours: result.getUTCHours(),
		minutes: result.getUTCMinutes(),
		seconds: result.getUTCSeconds(),
	}
}

/**
 * Преобразует строку с датой к `Timestamp`
 * @param date - дата в виде строки
 * @param isUtc - указывает на UTC таймзону. Если `true`, то к итоговому времени будет прибавлено 3 часа для достижения таймзоны МСК
 * @returns объект `Timestamp`
 */
export const dateStringToTimestamp = (
	date: string,
	isUtc?: boolean
): Timestamp => {
	const inDate = new Date(date)
	if (isUtc) inDate.setHours(inDate.getHours() + 3)
	return dateToTimestamp(inDate)
}

/**
 * Вычисляет разницу между двумя Timestamp в секундах. При любом порядке аргументов будет
 * возвращено положительное число
 * @returns разница между Timestamp в секундах
 */
export const getTimestampDifferenceInSeconds = (
	reduced: Timestamp,
	subtracted: Timestamp
): number => {
	const result =
		timestampToDate(reduced).getTime() - timestampToDate(subtracted).getTime()
	return (result > 0 ? result : result * -1) / 1000
}
