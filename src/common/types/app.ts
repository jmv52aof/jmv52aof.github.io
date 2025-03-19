import { ChargingSessionDto } from './chargingSessions'
import { Position } from './position'
import { RfidCardDto } from './rfidCards'
import { StationDto, StationFilters } from './stations'
import { SessionFilters } from './chargingSessions'
import { Variant } from './snackbar'
import { ViewState } from './map'

/**
 * Поле isInitTelegramSdk = undefined - когда telegram sdk ещё не инициализировано
 * Поле position = undefined - когда оно не инициализировано
 * Поле position = null - когда пользователь отказал в доступе к геолокации или произошла ошибка во время получения геолокации
 */
export type RootState = {
	stationFilters: StationFilters
	stations: StationDto[]
	sessionFilters: SessionFilters
	sessions: ChargingSessionDto[]
	position?: Position | null
	isInitTelegramSdk?: boolean
	rfidCard?: RfidCardDto
	activeChargingSession?: ChargingSessionDto
	paymentMethod?: string
	mapViewState?: ViewState
}

export interface IRootStateContext extends RootState {
	setStationFilters: (filters: StationFilters) => void
	setStations: (stations: StationDto[]) => void
	setSessionFilters: (filters: SessionFilters) => void
	setSessions: (sessions: ChargingSessionDto[]) => void
	showSnackbar: (type: Variant, text: string) => void
	setPosition: (position: Position | null) => void
	setRfidCard: (card?: RfidCardDto) => void
	setActiveChargingSession: (session?: ChargingSessionDto) => void
	setPaymentMethod: (method?: string) => void
	setMapViewState: (viewState: ViewState) => void
}
