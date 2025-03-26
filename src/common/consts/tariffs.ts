import { TariffType } from '@common/types/tariffs'

export const TARIFF_TYPE_HAS_UNIT_OF_MEASUREMENT: Record<
	TariffType,
	string | null
> = {
	Энергия: 'кВт·ч',
	'Начало зарядки': null,
	Длительность: 'час',
	'Длительность парковки': 'час',
}

export namespace TariffTypes {
	export const FLAT: TariffType = 'Начало зарядки'
	export const ENERGY: TariffType = 'Энергия'
	export const TIME: TariffType = 'Длительность'
	export const PARKING: TariffType = 'Длительность парковки'
}
