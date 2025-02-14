export type TariffType = 'energy' | 'flat' | 'time' | 'parking_time'

export type TariffCurrency = 'RUB'

export interface ConnectorTariffDto {
	type: TariffType
	/** Цена по тарифу */
	price: number
	/** Валюта тарифа */
	currency: TariffCurrency
}
