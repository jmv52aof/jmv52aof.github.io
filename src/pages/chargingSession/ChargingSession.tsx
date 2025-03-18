import ChargingSession from '@features/chargingSession/ChargingSession'
import { useChargingSessionQueryParser } from './lib/hooks'
import { ChargingSessionPreviousPageQueries } from '@common/consts/pages'
import { SESSIONS_HISTORY_ENDPOINT } from '@common/consts/endpoints'
import { useNavigate } from 'react-router'
import PageLayout from '@layouts/pageLayout/PageLayout'
import { useContext } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import NotFoundPage from '@pages/notFound/NotFound'
import { useActiveChargingSessionUpdater } from '@common/hooks/chargingSessions'

export default function ChargingSessionPage(): React.JSX.Element {
	const nav = useNavigate()
	const { pageQueries } = useChargingSessionQueryParser()
	const { activeChargingSession } = useContext(RootStateContext)
	useActiveChargingSessionUpdater()

	const getPreviousPageEndpoint = (): string | undefined => {
		switch (pageQueries.prev_page) {
			case ChargingSessionPreviousPageQueries.MAIN:
				return '/'
			case ChargingSessionPreviousPageQueries.SESSIONS_LIST:
				return SESSIONS_HISTORY_ENDPOINT
		}
	}

	if (!activeChargingSession) return <NotFoundPage />

	return (
		<PageLayout
			onReturn={() => {
				const endpoint = getPreviousPageEndpoint()
				if (endpoint) nav(endpoint)
			}}
			title='Зарядная сессия'
		>
			<ChargingSession chargingSession={activeChargingSession} />
		</PageLayout>
	)
}
