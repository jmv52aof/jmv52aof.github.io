/** Фильтры станций */
export type StationsFiltersPageQueryArgument = 'prev_page'

export type StationsFiltersPreviousPageQuery = 'main' | 'stations_list'

export type StationsFiltersPageQuery = {
	prev_page?: StationsFiltersPreviousPageQuery
}

/** Фильтры сессий */
export type SessionsFiltersPageQueryArgument = 'prev_page'

export type SessionsFiltersPreviousPageQuery = 'main' | 'sessions_list'

export type SessionsFiltersPageQuery = {
	prev_page?: SessionsFiltersPreviousPageQuery
}

/** Зарядная сессия */
export type ChargingSessionQueryArgument = 'prev_page'

export type ChargingSessionPreviousPageQuery = 'main' | 'sessions_list'

export type ChargingSessionPageQuery = {
	prev_page?: ChargingSessionPreviousPageQuery
}

/** Профиль станции */
export type StationProfileQueryArgument =
	| 'prev_page'
	| 'from_charging_session_id'

export type StationProfilePreviousPageQuery =
	| 'main'
	| 'stations_list'
	| 'active_session'
	| 'sessions_list'

export type StationProfilePageQuery = {
	prev_page?: StationProfilePreviousPageQuery
	from_charging_session_id?: string
}
