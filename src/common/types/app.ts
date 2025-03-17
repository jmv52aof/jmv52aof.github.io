import { StationDto, StationFilters } from './stations'
import { ChargingSessionDto, SessionFilters } from './chargingSessions'

export type RootState = {
	stationFilters: StationFilters
	stations: StationDto[]
	sessionFilters: SessionFilters
	sessions: ChargingSessionDto[]
}

export interface IRootStateContext extends RootState {
	setStationFilters: (filters: StationFilters) => void
	setStations: (stations: StationDto[]) => void
	setSessionFilters: (filters: SessionFilters) => void
	setSessions: (sessions: ChargingSessionDto[]) => void
}
