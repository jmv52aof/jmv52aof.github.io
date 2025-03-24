import { ChargingSessionStatuses } from '@common/consts/chargingSessions'
import { useApi } from '@common/hooks/api'
import { useInterval } from '@common/hooks/timer'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import { useEffect, useState } from 'react'

/** Хук обновляет данные по активной сессий каждый фиксированный промежуток времени */
export const useActiveChargingSessionUpdater = () => {
	const { getChargingSessionByIdFromApi, getChargingSessionsFromApi } = useApi()

	const [loading, setLoading] = useState<boolean>(false)
	const [activeSession, setActiveSession] = useState<
		ChargingSessionDto | undefined
	>()
	const [initialized, setInitialized] = useState<boolean>(!!activeSession)

	/** Инициализация активной сессии */
	const loadSession = () => {
		if (activeSession) return

		getChargingSessionsFromApi({
			status: ChargingSessionStatuses.CHARGING,
		})
			.then(res => {
				if (res.length > 0) setActiveSession(res[0])
			})
			.finally(() => {
				setLoading(false)
				setInitialized(true)
			})
	}

	/** Обновление активной сессии */
	const updateSession = () => {
		if (!activeSession) return

		getChargingSessionByIdFromApi({
			id: activeSession.id,
		})
			.then(res => {
				setActiveSession(
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
			if (activeSession) updateSession()
			else loadSession()
		},
		5000,
		[activeSession, loading]
	)

	useEffect(() => {
		loadSession()
		activate()
	}, [])

	return {
		initialized,
		activeSession,
	}
}
