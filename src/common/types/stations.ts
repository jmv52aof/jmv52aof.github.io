import { ConnectorTariffDto } from './tariffs'

export type StationStatus = 'Доступна' | 'Занята' | 'Не работает'

export type ConnectorStatus =
	| 'Доступен'
	| 'Занят'
	| 'Отключен'
	| 'Нет соединения'
	| 'Недоступен'

export type ConnectorStandard =
	| 'CHAdeMO'
	| 'GB/T (AC)'
	| 'GB/T (DC)'
	| 'Type 1'
	| 'Type 2'
	| 'CCS1'
	| 'CCS2'
	| 'Tesla'
	| 'Другой'

export type StationFilters = {
	connectors: ConnectorStandard[]
	onlyAvailableStations: boolean
	minimalPower: number
	isModified: boolean
}

export type ConnectorFormat = 'Розетка' | 'Кабель'

export type ConnectorPowerType = 'AC' | 'AC-2' | 'AC-3' | 'DC'

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
	tariffs: ConnectorTariffDto[]
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
	/** Загруженность станции по дням недели */
	occupation: DailyOccupationDto[]
}

export interface ConnectorInfoDto {
	station_id: string
	station_name: string
	station_address: string
	/** Уникальный идентификатор EVSE */
	evse_uid: string
	connector_id: string
	standard: ConnectorStandard
	format: ConnectorFormat
	power_type: ConnectorPowerType
}
