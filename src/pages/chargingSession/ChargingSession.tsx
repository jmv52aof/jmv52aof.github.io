import ChargingSession from '@features/chargingSession/ChargingSession'
import { useChargingSessionQueryParser } from './lib/hooks'
import { ChargingSessionPreviousPageQueries } from '@common/consts/pages'
import { SESSIONS_HISTORY_ENDPOINT } from '@common/consts/endpoints'
import { Navigate, useNavigate } from 'react-router'
import PageLayout from '@layouts/pageLayout/PageLayout'
import { useActiveChargingSessionUpdater } from '@common/hooks/chargingSessions'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import { useContext, useEffect } from 'react'
import { RootStateContext } from '@contexts/RootStateContext'

export default function ChargingSessionPage(): React.JSX.Element {
	const nav = useNavigate()
	const { setLastStoppedChargingSessionId } = useContext(RootStateContext)
	const { pageQueries } = useChargingSessionQueryParser()
	const { initialized, activeSession } = useActiveChargingSessionUpdater()

	useEffect(() => {
		setLastStoppedChargingSessionId(undefined)
	}, [])

	const getPreviousPageEndpoint = (): string => {
		switch (pageQueries.prev_page) {
			case ChargingSessionPreviousPageQueries.SESSIONS_LIST:
				return SESSIONS_HISTORY_ENDPOINT
		}
		return '/'
	}

	if (!activeSession && initialized)
		return <Navigate to={SESSIONS_HISTORY_ENDPOINT} replace />

	return (
		<PageLayout
			onReturn={() => nav(getPreviousPageEndpoint())}
			title='Зарядная сессия'
			loading={!initialized}
		>
			<ChargingSession chargingSession={activeSession as ChargingSessionDto} />
		</PageLayout>
	)
}
