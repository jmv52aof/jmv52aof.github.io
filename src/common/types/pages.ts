export type StationsFiltersPageQueryArgument = 'prev_page'

export type StationsFiltersPreviousPageQuery = 'main' | 'stations_list'

export type StationsFiltersPageQuery = {
	prev_page?: StationsFiltersPreviousPageQuery
}

export type ChargingSessionQueryArgument = 'prev_page'

export type ChargingSessionPreviousPageQuery = 'main' | 'sessions_list'

export type ChargingSessionPageQuery = {
	prev_page?: ChargingSessionPreviousPageQuery
}
