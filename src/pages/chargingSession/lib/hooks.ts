import { ChargingSessionPageQueryArguments } from '@common/consts/pages'
import {
	ChargingSessionPageQuery,
	ChargingSessionPreviousPageQuery,
} from '@common/types/pages'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

/** Хук предоставляет доступ к query аргументам URL страницы */
export const useChargingSessionQueryParser = () => {
	const [searchParams] = useSearchParams()
	const [pageQueries, setPageQueries] = useState<ChargingSessionPageQuery>({})

	useEffect(() => {
		const prevPage = searchParams.get(
			ChargingSessionPageQueryArguments.PREVIOUS_PAGE
		) as ChargingSessionPreviousPageQuery | undefined

		setPageQueries({ prev_page: prevPage })
	}, [searchParams])

	return {
		pageQueries,
	}
}
