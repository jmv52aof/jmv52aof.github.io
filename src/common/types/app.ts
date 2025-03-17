import { Position } from './position'
import { RfidCardDto } from './rfidCards'
import { StationDto, StationFilters } from './stations'

export type RootState = {
	stationFilters: StationFilters
	stations: StationDto[]
	position: Position
	rfidCard?: RfidCardDto
}

export interface IRootStateContext extends RootState {
	setStationFilters: (filters: StationFilters) => void
	setStations: (stations: StationDto[]) => void
	setPosition: (position: Position) => void
	setRfidCard: (card?: RfidCardDto) => void
}
