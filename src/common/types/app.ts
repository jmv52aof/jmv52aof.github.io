import { Position } from './position'
import { StationDto, StationFilters } from './stations'

export type RootState = {
	stationFilters: StationFilters
	stations: StationDto[]
	position: Position
}

export interface IRootStateContext extends RootState {
	setStationFilters: (filters: StationFilters) => void
	setStations: (stations: StationDto[]) => void
	setPosition: (position: Position) => void
}
