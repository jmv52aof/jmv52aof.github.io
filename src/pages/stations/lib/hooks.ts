import { createGetStationsRequestOptions } from '@common/functions/stations'
import { useApi } from '@common/hooks/api'
import { RootStateContext } from 'contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'

export const useStationsLoader = () => {
	const { getStationsFromApi } = useApi()
	const { stationFilters, setStations } = useContext(RootStateContext)

	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!stationFilters.shouldUpdateStations) {
			setLoading(false)
			return
		}

		getStationsFromApi(createGetStationsRequestOptions(stationFilters))
			.then(res => {
				setStations(res)
			})
			.finally(() => setLoading(false))
	}, [])

	/** Получение станций по заданным параметрам отступа и лимита */
	const getByOffsetAndLimit = (offset: number, limit: number) => {
		return getStationsFromApi({
			...createGetStationsRequestOptions(stationFilters),
			offset: offset,
			limit: limit,
		})
	}

	return {
		getByOffsetAndLimit,
		loading,
	}
}
