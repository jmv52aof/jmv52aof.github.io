import { ChargingSessionDto } from '@common/types/chargingSessions'
import ChargingSession from '@features/chargingSession/ChargingSession'
import { useChargingSessionQueryParser } from './lib/hooks'
import { ChargingSessionPreviousPageQueries } from '@common/consts/pages'
import { SESSIONS_HISTORY_ENDPOINT } from '@common/consts/endpoints'
import { useNavigate } from 'react-router'
import PageLayout from '@layouts/pageLayout/PageLayout'

export default function ChargingSessionPage(): React.JSX.Element {
	const nav = useNavigate()

	const { pageQueries } = useChargingSessionQueryParser()

	const getPreviousPageEndpoint = (): string | undefined => {
		switch (pageQueries.prev_page) {
			case ChargingSessionPreviousPageQueries.MAIN:
				return '/'
			case ChargingSessionPreviousPageQueries.SESSIONS_LIST:
				return SESSIONS_HISTORY_ENDPOINT
		}
	}

	const chargingSession: ChargingSessionDto = {
		id: '1',
		status: 'Зарядка',
		charged_kwh: 22.4,
		connector_info: {
			station_id: '123456789',
			station_name: 'Зарядная станция Альфа',
			station_address: 'Улица Ленина, 10',
			evse_uid: 'EVSE-001',
			connector_id: 'Connector-1',
			standard: 'CCS2',
			format: 'Кабель',
			power_type: 'AC-3',
			max_electric_power: 34,
		},
		tariffs: [
			{
				type: 'Энергия',
				price: 100,
				currency: 'руб',
			},
			{
				type: 'Энергия',
				price: 150,
				currency: 'руб',
			},
		],
		start_date: {
			year: 2025,
			month: 3,
			day: 19,
			hours: 13,
			minutes: 2,
			seconds: 0,
		},
		end_date: {
			year: 2025,
			month: 3,
			day: 19,
			hours: 14,
			minutes: 24,
			seconds: 0,
		},
		battery_percentage: 66,
		current_power: 16.6,
		min_power: 14,
		max_power: 22,
	}

	return (
		<PageLayout
			onReturn={() => {
				const endpoint = getPreviousPageEndpoint()
				if (endpoint) nav(endpoint)
			}}
			title='Зарядная сессия'
		>
			<ChargingSession chargingSession={chargingSession} />
		</PageLayout>
	)
}
