import { Position } from './position'
import { StationDto, StationFilters } from './stations'

/**
 * Поле position = undefined - когда оно не инициализировано
 * Поле position = null - когда пользователь отказал в доступе к геолокации или произошла ошибка во время получения геолокации
 */
export type RootState = {
	stationFilters: StationFilters
	stations: StationDto[]
	position?: Position | null
	isInitTelegramSdk?: boolean
}

export interface IRootStateContext extends RootState {
	setStationFilters: (filters: StationFilters) => void
	setStations: (stations: StationDto[]) => void
	setPosition: (position: Position | null) => void
}
