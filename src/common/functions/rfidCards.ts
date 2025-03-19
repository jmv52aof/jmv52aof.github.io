/** Маскирует номер карты */
export const maskCardNumber = (
	number: string,
	maskCharacter: string = '*'
): string => {
	const numberLength = number.length

	let viewLen = 0
	if (numberLength > 8) viewLen = 4
	else if (numberLength > 6) viewLen = 3
	else if (numberLength > 4) viewLen = 1

	return maskCharacter.repeat(number.length - viewLen) + number.slice(-viewLen)
}
