export type StationStatus = 'AVAILABLE' | 'CHARGING' | 'INOPERATIVE'

export type ConnectorStatus =
	| 'AVAILABLE'
	| 'CHARGING'
	| 'INOPERATIVE'
	| 'UNKNOWN'
	| 'OUTOFORDER'

export type ConnectorStandard =
	| 'CHADEMO'
	| 'GBT_AC'
	| 'GBT_DC'
	| 'TYPE_1'
	| 'TYPE_2'
	| 'CCS1'
	| 'CCS2'
	| 'TESLA'

export type ConnectorFormat = 'SOCKET' | 'CABLE'

export type ConnectorPowerType =
	| 'AC_1_PHASE'
	| 'AC_2_PHASE'
	| 'AC_2_PHASE_SPLIT'
	| 'AC_3_PHASE'
	| 'DC'

export interface GeolocationDto {
	/** Широта */
	latitude: string
	/** Долгота */
	longitude: string
}

export interface DailyOccupationDto {
	/** День недели: от 1 до 7 */
	weekday: number
	/** Занятость в процентах */
	occupancy_in_percentage: number
}

export type TariffType = 'ENERGY' | 'FLAT' | 'TIME' | 'PARKING_TIME'

export type TariffCurrency = 'RUB'

export interface ConnectorTariffDto {
	type: TariffType
	/** Цена по тарифу */
	price: number
	/** Валюта тарифа */
	currency: TariffCurrency
}

export interface ConnectorDto {
	/** Уникальный идентификатор EVSE */
	evse_uid: string
	id: string
	status: ConnectorStatus
	standard: ConnectorStandard
	format: ConnectorFormat
	power_type: ConnectorPowerType
	/** Максимальное напряжение */
	max_voltage: number
	/** Максимальная сила тока  */
	max_amperage: number
	/** Максимальная мощность */
	max_electric_power: number
	tariffs?: ConnectorTariffDto[]
}

export interface StationDto {
	id: string
	name: string
	address: string
	status: StationStatus
	description?: string
	coordinates: GeolocationDto
	connectors: ConnectorDto[]
	images?: string[]
	/** Сколько метров до станции от заданной точки геолокации */
	metres_to_station?: number
	/** Рейтинг станции: оценка от 1 до 5 */
	rating?: number
	occupation?: DailyOccupationDto[]
}
