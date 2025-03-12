import { StationProfilePageQueryArguments } from '@common/consts/pages'
import {
	StationProfilePageQuery,
	StationProfilePreviousPageQuery,
} from '@common/types/pages'
import { StationDto } from '@common/types/stations'
import { RootStateContext } from 'contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'

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

/** Хук предоставляет загрузку станции по id из URL */
export const useStationLoader = () => {
	const { id } = useParams()
	const { stations } = useContext(RootStateContext)

	const [station, setStation] = useState<StationDto | undefined>()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (id !== undefined) {
			setStation(stations.find(value => value.id === id))
			setLoading(false)
		}
	}, [id])

	return {
		station,
		loading,
	}
}
