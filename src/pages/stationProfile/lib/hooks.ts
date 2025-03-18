import { StationProfilePageQueryArguments } from '@common/consts/pages'
import { useApi } from '@common/hooks/api'
import {
	StationProfilePageQuery,
	StationProfilePreviousPageQuery,
} from '@common/types/pages'
import { StationDto } from '@common/types/stations'
import { RootStateContext } from '@contexts/RootStateContext'
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
		const fromChargingSessionId = searchParams.get(
			StationProfilePageQueryArguments.FROM_CHARGING_SESSION_ID
		) as string | undefined

		setPageQueries({
			prev_page: prevPage,
			from_charging_session_id: fromChargingSessionId,
		})
	}, [searchParams])

	return {
		pageQueries,
	}
}

/** Хук предоставляет загрузку станции по id из URL */
export const useStationLoader = () => {
	const { id } = useParams()
	const { position } = useContext(RootStateContext)
	const { getStationByIdFromApi } = useApi()

	const [station, setStation] = useState<StationDto | undefined>()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (id !== undefined) {
			getStationByIdFromApi({
				id: id,
				latitude: position?.latitude.toString(),
				longitude: position?.longitude.toString(),
			})
				.then(res => {
					if (res) setStation(res)
				})
				.finally(() => setLoading(false))
		}
	}, [id])

	return {
		station,
		loading,
	}
}
