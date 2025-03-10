import {
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
