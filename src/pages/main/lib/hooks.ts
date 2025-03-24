import { createGetStationsRequestOptions } from '@common/functions/stations'
import { useApi } from '@common/hooks/api'
import { RootStateContext } from 'contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'

/** Хук загружает все станции для отображения на карте в общее состояние */
export const useStationsLoader = () => {
	const { setStations, stationFilters, position } = useContext(RootStateContext)
	const { getStationsFromApi } = useApi()

	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!stationFilters.shouldUpdateStations) {
			setLoading(false)
			return
		}

		setLoading(true)
		getStationsFromApi(
			createGetStationsRequestOptions(stationFilters, position)
		)
			.then(res => {
				setStations(res)
			})
			.finally(() => setLoading(false))
	}, [stationFilters])

	return {
		/** Имеет значение `true` когда данные загружаются, в противном случае - `false` */
		stationsLoading: loading,
	}
}
