import { Position } from './position'
import { RfidCardDto } from './rfidCards'
import { StationDto, StationFilters } from './stations'
import { ChargingSessionDto, onlyPaidSessions } from './chargingSessions'

/**
 * Поле isInitTelegramSdk = undefined - когда telegram sdk ещё не инициализировано
 * Поле position = undefined - когда оно не инициализировано
 * Поле position = null - когда пользователь отказал в доступе к геолокации или произошла ошибка во время получения геолокации
 */
export type RootState = {
	stationFilters: StationFilters
	stations: StationDto[]
	sessionFilters: onlyPaidSessions
	sessions: ChargingSessionDto[]
	position?: Position | null
	isInitTelegramSdk?: boolean
	rfidCard?: RfidCardDto
}

export interface IRootStateContext extends RootState {
	setStationFilters: (filters: StationFilters) => void
	setStations: (stations: StationDto[]) => void
	setSessionFilters: (filters: onlyPaidSessions) => void
	setSessions: (sessions: ChargingSessionDto[]) => void
	setPosition: (position: Position | null) => void
	setRfidCard: (card?: RfidCardDto) => void
}
