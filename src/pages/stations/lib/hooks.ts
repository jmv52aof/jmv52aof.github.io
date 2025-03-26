import { StationsListPageQueryArguments } from '@common/consts/pages'
import { createGetStationsRequestOptions } from '@common/functions/stations'
import { useApi } from '@common/hooks/api'
import { StationsListPageQuery } from '@common/types/pages'
import { RootStateContext } from 'contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

export const useStationsLoader = () => {
	const { getStationsFromApi } = useApi()
	const { stationFilters, setStationFilters, setStations, position } =
		useContext(RootStateContext)

	const [loading, setLoading] = useState<boolean>(true)

	const updateStationsByFilters = (name?: string) => {
		getStationsFromApi({
			...createGetStationsRequestOptions(stationFilters, position),
			partOfName: stationFilters.partOfName ?? name,
		})
			.then(res => {
				setStations(res)
			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		updateStationsByFilters()
	}, [])

	/** Получение станций по заданным параметрам отступа и лимита */
	const getByOffsetAndLimit = (offset: number, limit: number) => {
		return getStationsFromApi({
			...createGetStationsRequestOptions(stationFilters),
			offset: offset,
			limit: limit,
		})
	}

	/** Обновление станций по названию */
	const updateStationsByName = (name: string) => {
		setLoading(true)
		updateStationsByFilters(name)
		setStationFilters({
			...stationFilters,
			partOfName: name,
			shouldUpdateStations: true,
		})
	}

	return {
		getByOffsetAndLimit,
		updateStationsByName,
		loading,
	}
}

export const useStationsListQueryParser = () => {
	const [searchParams] = useSearchParams()
	const [pageQueries, setPageQueries] = useState<StationsListPageQuery>({})

	useEffect(() => {
		const searchFocused =
			searchParams.get(StationsListPageQueryArguments.SEARCH_FOCUSED) === 'true'
				? true
				: false

		setPageQueries({ search_focused: searchFocused })
	}, [searchParams])

	return {
		pageQueries,
	}
}
