import { SessionsFiltersPageQueryArguments } from '@common/consts/pages'
import {
	SessionsFiltersPageQuery,
	SessionsFiltersPreviousPageQuery,
} from '@common/types/pages'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

/** Хук предоставляет доступ к query аргументам URL страницы */
export const useSessionsFiltersQueryParser = () => {
	const [searchParams] = useSearchParams()
	const [pageQueries, setPageQueries] = useState<SessionsFiltersPageQuery>({})

	useEffect(() => {
		const prevPage = searchParams.get(
			SessionsFiltersPageQueryArguments.PREVIOUS_PAGE
		) as SessionsFiltersPreviousPageQuery | undefined

		setPageQueries({ prev_page: prevPage })
	}, [searchParams])

	return {
		pageQueries,
	}
}
