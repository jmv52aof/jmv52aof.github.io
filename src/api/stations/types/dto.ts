export type StationStatusResponse = 'AVAILABLE' | 'CHARGING' | 'INOPERATIVE'

export type ConnectorStatusResponse =
	| 'AVAILABLE'
	| 'CHARGING'
	| 'INOPERATIVE'
	| 'UNKNOWN'
	| 'OUTOFORDER'

export type ConnectorStandardResponse =
	| 'CHADEMO'
	| 'GBT_AC'
	| 'GBT_DC'
	| 'TYPE_1'
	| 'TYPE_2'
	| 'CCS1'
	| 'CCS2'
	| 'TESLA'
	| 'OTHER'

export type ConnectorFormatResponse = 'SOCKET' | 'CABLE'

export type ConnectorPowerTypeResponse =
	| 'AC_1_PHASE'
	| 'AC_2_PHASE'
	| 'AC_2_PHASE_SPLIT'
	| 'AC_3_PHASE'
	| 'DC'

export interface GeolocationResponseDto {
	/** Широта */
	latitude: string
	/** Долгота */
	longitude: string
}

export interface DailyOccupationResponseDto {
	/** День недели: от 1 до 7 */
	weekday: number
	/** Занятость в процентах */
	occupancy_in_percentage: number
}

export type TariffTypeResponse = 'ENERGY' | 'FLAT' | 'TIME' | 'PARKING_TIME'

export type TariffCurrencyResponse = 'RUB'

export interface ConnectorTariffResponseDto {
	type: TariffTypeResponse
	/** Цена по тарифу */
	price: number
	/** Валюта тарифа */
	currency: TariffCurrencyResponse
}

export interface ConnectorResponseDto {
	/** Уникальный идентификатор EVSE */
	evse_uid: string
	id: string
	status: ConnectorStatusResponse
	standard: ConnectorStandardResponse
	format: ConnectorFormatResponse
	power_type: ConnectorPowerTypeResponse
	/** Максимальное напряжение */
	max_voltage: number
	/** Максимальная сила тока  */
	max_amperage: number
	/** Максимальная мощность */
	max_electric_power: number
	tariffs?: ConnectorTariffResponseDto[]
}

export interface StationResponseDto {
	id: number
	name: string
	address: string
	status: StationStatusResponse
	description?: string
	coordinates: GeolocationResponseDto
	connectors: ConnectorResponseDto[]
	images?: string[]
	/** Сколько метров до станции от заданной точки геолокации */
	metres_to_station?: number
	occupation?: DailyOccupationResponseDto[]
}
