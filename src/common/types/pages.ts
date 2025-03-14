/** Фильтры станций */
export type StationsFiltersPageQueryArgument = 'prev_page'

export type StationsFiltersPreviousPageQuery = 'main' | 'stations_list'

export type StationsFiltersPageQuery = {
	prev_page?: StationsFiltersPreviousPageQuery
}

/** Зарядная сессия */
export type ChargingSessionQueryArgument = 'prev_page'

export type ChargingSessionPreviousPageQuery = 'main' | 'sessions_list'

export type ChargingSessionPageQuery = {
	prev_page?: ChargingSessionPreviousPageQuery
}

/** Профиль станции */
export type StationProfileQueryArgument = 'prev_page'

export type StationProfilePreviousPageQuery = 'main' | 'stations_list'

export type StationProfilePageQuery = {
	prev_page?: StationProfilePreviousPageQuery
}
