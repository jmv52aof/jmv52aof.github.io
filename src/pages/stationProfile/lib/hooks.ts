import { StationProfilePageQueryArguments } from '@common/consts/pages'
import {
	StationProfilePageQuery,
	StationProfilePreviousPageQuery,
} from '@common/types/pages'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

/** Хук предоставляет доступ к query аргументам URL страницы */
export const useStationProfileQueryParser = () => {
	const [searchParams] = useSearchParams()
	const [pageQueries, setPageQueries] = useState<StationProfilePageQuery>({})

	useEffect(() => {
		const prevPage = searchParams.get(
			StationProfilePageQueryArguments.PREVIOUS_PAGE
		) as StationProfilePreviousPageQuery | undefined

		setPageQueries({ prev_page: prevPage })
	}, [searchParams])

	return {
		pageQueries,
	}
}
