import {
	ChargingSessionPreviousPageQuery,
	ChargingSessionQueryArgument,
	StationsFiltersPageQueryArgument,
	StationsFiltersPreviousPageQuery,
} from '@common/types/pages'

export namespace StationsFiltersPageQueryArguments {
	export const PREVIOUS_PAGE: StationsFiltersPageQueryArgument = 'prev_page'
}

export namespace StationsFiltersPreviousPageQueries {
	export const MAIN: StationsFiltersPreviousPageQuery = 'main'
	export const STATIONS_LIST: StationsFiltersPreviousPageQuery = 'stations_list'
}

export namespace ChargingSessionPageQueryArguments {
	export const PREVIOUS_PAGE: ChargingSessionQueryArgument = 'prev_page'
}

export namespace ChargingSessionPreviousPageQueries {
	export const MAIN: ChargingSessionPreviousPageQuery = 'main'
	export const SESSIONS_LIST: ChargingSessionPreviousPageQuery = 'sessions_list'
}
