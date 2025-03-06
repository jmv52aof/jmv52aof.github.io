import { StationDto, StationFilters } from './stations'

export type RootState = {
	stationFilters: StationFilters
	stations: StationDto[]
}

export interface IRootStateContext extends RootState {
	setStationFilters: (filters: StationFilters) => void
	setStations: (stations: StationDto[]) => void
}
