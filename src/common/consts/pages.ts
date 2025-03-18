import {
	ChargingSessionPreviousPageQuery,
	ChargingSessionQueryArgument,
	StationProfilePreviousPageQuery,
	StationProfileQueryArgument,
	StationsFiltersPageQueryArgument,
	StationsFiltersPreviousPageQuery,
} from '@common/types/pages'

/** Фильтры станций */
export namespace StationsFiltersPageQueryArguments {
	export const PREVIOUS_PAGE: StationsFiltersPageQueryArgument = 'prev_page'
}

export namespace StationsFiltersPreviousPageQueries {
	export const MAIN: StationsFiltersPreviousPageQuery = 'main'
	export const STATIONS_LIST: StationsFiltersPreviousPageQuery = 'stations_list'
}

/** Зарядная сессия */
export namespace ChargingSessionPageQueryArguments {
	export const PREVIOUS_PAGE: ChargingSessionQueryArgument = 'prev_page'
}

export namespace ChargingSessionPreviousPageQueries {
	export const MAIN: ChargingSessionPreviousPageQuery = 'main'
	export const SESSIONS_LIST: ChargingSessionPreviousPageQuery = 'sessions_list'
}

/** Профиль станции */
export namespace StationProfilePageQueryArguments {
	export const PREVIOUS_PAGE: StationProfileQueryArgument = 'prev_page'
	export const FROM_CHARGING_SESSION_ID: StationProfileQueryArgument =
		'from_charging_session_id'
}

export namespace StationProfilePreviousPageQueries {
	export const MAIN: StationProfilePreviousPageQuery = 'main'
	export const STATIONS_LIST: StationProfilePreviousPageQuery = 'stations_list'
	export const ACTIVE_SESSION: StationProfilePreviousPageQuery =
		'active_session'
	export const SESSIONS_LIST: StationProfilePreviousPageQuery = 'sessions_list'
}
