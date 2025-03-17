import { StationDto, StationFilters } from './stations'
import { Variant } from '@components/snackbar/lib/types'

export type RootState = {
	stationFilters: StationFilters
	stations: StationDto[]
}

export interface IRootStateContext extends RootState {
	setStationFilters: (filters: StationFilters) => void
	setStations: (stations: StationDto[]) => void
	snackbarText: string
	snackbarVariant: Variant
	isSnackbarVisible: boolean
	showSnackbar: (type: Variant, message: string) => void
}
