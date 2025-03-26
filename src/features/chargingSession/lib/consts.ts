import { TariffType } from '@common/types/tariffs'

export const TARIFF_TYPE_HAS_PRIORITY: Record<TariffType, number> = {
	'Начало зарядки': 3,
	Энергия: 2,
	Длительность: 1,
	'Длительность парковки': 0,
}
