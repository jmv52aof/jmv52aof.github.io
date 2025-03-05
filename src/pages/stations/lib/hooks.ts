import { StationStatuses } from '@common/consts/stations'
import { useApi } from '@common/hooks/api'
import { RootStateContext } from 'contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'

export const useStationsLoader = () => {
	const { getStationsFromApi } = useApi()
	const { stations, setStations, stationFilters } = useContext(RootStateContext)

	const [loading, setLoading] = useState<boolean>(
		!stations.length || stationFilters.isModified
	)

	const getRequestOptions = () => {
		return {
			minElectricPower: stationFilters.minimalPower,
			standards: stationFilters.connectors,
			stationStatus: stationFilters.onlyAvailableStations
				? StationStatuses.AVAILABLE
				: undefined,
		}
	}

	useEffect(() => {
		getStationsFromApi(getRequestOptions())
			.then(res => {
				console.log('new data: ', res)
				setStations(res)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return {
		loading,
	}
}
