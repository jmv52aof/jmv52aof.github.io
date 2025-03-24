import ChargingSession from '@features/chargingSession/ChargingSession'
import { useChargingSessionQueryParser } from './lib/hooks'
import { ChargingSessionPreviousPageQueries } from '@common/consts/pages'
import { SESSIONS_HISTORY_ENDPOINT } from '@common/consts/endpoints'
import { useNavigate } from 'react-router'
import PageLayout from '@layouts/pageLayout/PageLayout'
import NotFoundPage from '@pages/notFound/NotFound'
import { useActiveChargingSessionUpdater } from '@common/hooks/chargingSessions'
import { ChargingSessionDto } from '@common/types/chargingSessions'

export default function ChargingSessionPage(): React.JSX.Element {
	const nav = useNavigate()
	const { pageQueries } = useChargingSessionQueryParser()
	const { initialized, activeSession } = useActiveChargingSessionUpdater()

	const getPreviousPageEndpoint = (): string => {
		switch (pageQueries.prev_page) {
			case ChargingSessionPreviousPageQueries.SESSIONS_LIST:
				return SESSIONS_HISTORY_ENDPOINT
		}
		return '/'
	}

	if (!activeSession && initialized) return <NotFoundPage />

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
