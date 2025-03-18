import { createGetChargingSessionsRequestOptions } from '@common/functions/chargingSessions'
import { useApi } from '@common/hooks/api'
import { RootStateContext } from '@contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'

export const useChargingSessionsLoader = () => {
	const { getChargingSessionsFromApi } = useApi()
	const { sessionFilters, setSessions } = useContext(RootStateContext)

	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!sessionFilters.shouldUpdateSessions) {
			setLoading(false)
			return
		}

		getChargingSessionsFromApi(
			createGetChargingSessionsRequestOptions(sessionFilters)
		)
			.then(res => {
				setSessions(res)
			})
			.finally(() => setLoading(false))
	}, [])

	/** Получение сессий по заданным параметрам отступа и лимита */
	const getByOffsetAndLimit = (offset: number, limit: number) => {
		return getChargingSessionsFromApi({
			...createGetChargingSessionsRequestOptions(sessionFilters),
			offset: offset,
			limit: limit,
		})
	}

	return {
		getByOffsetAndLimit,
		loading,
	}
}
