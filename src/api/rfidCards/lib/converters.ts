import { RfidCardDto } from '@common/types/rfidCards'
import { RfidCardResponseDto } from '../types/dto'

/** Преобразование серверных моделей в dto */

/** Преобразует серверную модель RFID карты к dto */
export const convertRfidCardResponseDto = (
	card: RfidCardResponseDto
): RfidCardDto => {
	return {
		visual_number: card.visual_number,
		group: card.group,
	}
}
