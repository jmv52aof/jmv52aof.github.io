export type TariffType =
	| 'Энергия'
	| 'Начало зарядки'
	| 'Длительность'
	| 'Длительность парковки'

export type TariffCurrency = 'руб'

export interface ConnectorTariffDto {
	type: TariffType
	/** Цена по тарифу */
	price: number
	/** Валюта тарифа */
	currency: TariffCurrency
}
