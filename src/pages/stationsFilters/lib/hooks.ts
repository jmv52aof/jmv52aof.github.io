import { StationsFiltersPageQueryArguments } from '@common/consts/pages'
import {
	StationsFiltersPageQuery,
	StationsFiltersPreviousPageQuery,
} from '@common/types/pages'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

/** Хук предоставляет доступ к query аргументам URL страницы */
export const useStationsFiltersQueryParser = () => {
	const [searchParams] = useSearchParams()
	const [pageQueries, setPageQueries] = useState<StationsFiltersPageQuery>({})

	useEffect(() => {
		const prevPage = searchParams.get(
			StationsFiltersPageQueryArguments.PREVIOUS_PAGE
		) as StationsFiltersPreviousPageQuery | undefined

		setPageQueries({ prev_page: prevPage })
	}, [searchParams])

	return {
		pageQueries,
	}
}
