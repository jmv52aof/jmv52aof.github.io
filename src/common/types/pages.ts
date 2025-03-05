export type StationsFiltersPageQueryArgument = 'prev_page'

export type StationsFiltersPreviousPageQuery = 'main' | 'stations_list'

export type StationsFiltersPageQuery = {
	prev_page?: StationsFiltersPreviousPageQuery
}
