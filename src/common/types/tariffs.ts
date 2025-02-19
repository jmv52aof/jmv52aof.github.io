export type TariffType = 'ENERGY' | 'FLAT' | 'TIME' | 'PARKING_TIME'

export type TariffCurrency = 'RUB'

export interface ConnectorTariffDto {
	type: TariffType
	/** Цена по тарифу */
	price: number
	/** Валюта тарифа */
	currency: TariffCurrency
}
