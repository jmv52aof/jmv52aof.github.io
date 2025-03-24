import { ChargingSessionStatuses } from '@common/consts/chargingSessions'
import { useApi } from '@common/hooks/api'
import { useInterval } from '@common/hooks/timer'
import { RootStateContext } from '@contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'

/** Хук обновляет данные по активной сессий каждый фиксированный промежуток времени */
export const useActiveChargingSessionUpdater = () => {
	const { activeChargingSession, setActiveChargingSession } =
		useContext(RootStateContext)
	const { getChargingSessionByIdFromApi, getChargingSessionsFromApi } = useApi()

	const [loading, setLoading] = useState<boolean>(false)
	const [initialized, setInitialized] = useState<boolean>(
		!!activeChargingSession
	)

	/** Инициализация активной сессии */
	const loadSession = () => {
		if (activeChargingSession) return

		getChargingSessionsFromApi({
			status: ChargingSessionStatuses.CHARGING,
		})
			.then(res => {
				if (res.length > 0) setActiveChargingSession(res[0])
			})
			.finally(() => {
				setLoading(false)
				setInitialized(true)
			})
	}

	/** Обновление активной сессии */
	const updateSession = () => {
		if (!activeChargingSession) return

		getChargingSessionByIdFromApi({
			id: activeChargingSession.id,
		})
			.then(res => {
				setActiveChargingSession(
					ChargingSessionStatuses.CHARGING === res?.status ? res : undefined
				)
			})
			.finally(() => {
				setLoading(false)
				setInitialized(true)
			})
	}

	const { activate } = useInterval(
		() => {
			setLoading(true)
			if (activeChargingSession) updateSession()
			else loadSession()
		},
		5000,
		[activeChargingSession, loading]
	)

	useEffect(() => {
		loadSession()
		activate()
	}, [])

	return {
		initialized,
	}
}
