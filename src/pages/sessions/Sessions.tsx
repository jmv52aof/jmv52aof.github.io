import styles from './styles.module.scss'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import FiltersButton from '@components/ui/filtersButton/FiltersButton'
import tuningImage from '@assets/images/tuning.svg'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import SessionCard from '@components/sessionCard/SessionCard'
import { useNavigate } from 'react-router'
import { SESSIONS_HISTORY_FILTERS_ENDPOINT } from '@common/consts/endpoints'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import { groupSessionsByDate } from './lib/functions'

/**
 * Страница с зарядными сессиями
 */
export default function SessiosPage(): React.JSX.Element {
	const nav = useNavigate()

	const onSessionsFiltersClick = () => {
		nav(SESSIONS_HISTORY_FILTERS_ENDPOINT)
	}

	const sessions: ChargingSessionDto[] = [
		{
			id: '1',
			connector_info: {
				station_id: '1',
				station_name: 'Отель Кукарский двор',
				station_address: 'г. Киров, ул. Дзержинского, 110',
				evse_uid: '1',
				connector_id: '1',
				standard: 'Type 1',
				format: 'Кабель',
				power_type: 'AC',
				max_electric_power: 36,
			},
			status: 'Завершена',
			charged_kwh: 22,
			start_date: {
				year: 2025,
				month: 2,
				day: 7,
				hours: 13,
				minutes: 20,
				seconds: 48,
			},
			end_date: {
				year: 2025,
				month: 2,
				day: 7,
				hours: 15,
				minutes: 8,
				seconds: 48,
			},
			max_power: 36,
			min_power: 6.2,
			current_power: 16.6,
			battery_percentage: 66.67,
			payment_method: 'Т-Банк',
			total_cost: 637.28,
			payment_status: 'Оплачено',
		},
		{
			id: '2',
			connector_info: {
				station_id: '2',
				station_name: 'Отель Кукарский двор',
				station_address: 'г. Киров, ул. Дзержинского, 110',
				evse_uid: '1',
				connector_id: '1',
				standard: 'Type 1',
				format: 'Кабель',
				power_type: 'AC',
				max_electric_power: 36,
			},
			status: 'Зарядка',
			charged_kwh: 22,
			start_date: {
				year: 2025,
				month: 2,
				day: 7,
				hours: 13,
				minutes: 20,
				seconds: 48,
			},
			end_date: {
				year: 2025,
				month: 2,
				day: 7,
				hours: 15,
				minutes: 8,
				seconds: 48,
			},
			max_power: 36,
			min_power: 6.2,
			current_power: 16.6,
			battery_percentage: 66.67,
			payment_method: 'Т-Банк',
			total_cost: 637.28,
			payment_status: 'Оплачено',
		},
		{
			id: '3',
			connector_info: {
				station_id: '2',
				station_name: 'Отель Кукарский двор',
				station_address: 'г. Киров, ул. Дзержинского, 110',
				evse_uid: '1',
				connector_id: '1',
				standard: 'CHAdeMO',
				format: 'Кабель',
				power_type: 'AC',
				max_electric_power: 36,
			},
			status: 'Завершена',
			charged_kwh: 22,
			start_date: {
				year: 2025,
				month: 2,
				day: 5,
				hours: 13,
				minutes: 20,
				seconds: 48,
			},
			end_date: {
				year: 2025,
				month: 2,
				day: 5,
				hours: 15,
				minutes: 8,
				seconds: 48,
			},
			max_power: 36,
			min_power: 6.2,
			current_power: 16.6,
			battery_percentage: 66.67,
			payment_method: 'Т-Банк',
			total_cost: 637.28,
			payment_status: 'Неоплачено',
		},
		{
			id: '4',
			connector_info: {
				station_id: '2',
				station_name: 'Отель Кукарский двор',
				station_address: 'г. Киров, ул. Дзержинского, 110',
				evse_uid: '1',
				connector_id: '1',
				standard: 'GB/T (DC)',
				format: 'Кабель',
				power_type: 'AC',
				max_electric_power: 36,
			},
			status: 'Невалидна',
			charged_kwh: 22,
			start_date: {
				year: 2025,
				month: 2,
				day: 5,
				hours: 13,
				minutes: 20,
				seconds: 48,
			},
			end_date: {
				year: 2025,
				month: 2,
				day: 5,
				hours: 15,
				minutes: 8,
				seconds: 48,
			},
			max_power: 36,
			min_power: 6.2,
			current_power: 16.6,
			battery_percentage: 66.67,
			payment_method: 'Т-Банк',
			total_cost: 637.28,
			payment_status: 'Оплачено',
		},
		{
			id: '5',
			connector_info: {
				station_id: '2',
				station_name: 'Отель Кукарский двор',
				station_address: 'г. Киров, ул. Дзержинского, 110',
				evse_uid: '1',
				connector_id: '1',
				standard: 'GB/T (DC)',
				format: 'Кабель',
				power_type: 'AC',
				max_electric_power: 36,
			},
			status: 'Невалидна',
			charged_kwh: 22,
			start_date: {
				year: 2025,
				month: 1,
				day: 15,
				hours: 13,
				minutes: 20,
				seconds: 48,
			},
			end_date: {
				year: 2025,
				month: 1,
				day: 15,
				hours: 15,
				minutes: 8,
				seconds: 48,
			},
			max_power: 36,
			min_power: 6.2,
			current_power: 16.6,
			battery_percentage: 66.67,
			payment_method: 'Т-Банк',
			total_cost: 637.28,
			payment_status: 'Оплачено',
		},
	]

	const groupedSessions = groupSessionsByDate(sessions)

	return (
		<div className={styles.sessionsPage}>
			<div className={styles.sessionsPage__header}>
				<div className={styles.header__content}>
					<ReturnButton onClick={() => {}} iconSrc={arrowImage} />
					<div className={styles.content__tittle}>
						<p className={styles.content__text}>Зарядные сессии</p>
					</div>
					<FiltersButton
						iconSrc={tuningImage}
						onClick={onSessionsFiltersClick}
						variant='fill'
					/>
				</div>
			</div>
			<div className={styles.sessionsPage__main}>
				{Object.entries(groupedSessions).map(([date, sessions]) => (
					<div key={date} className={styles.main__sessionsMap}>
						<div className={styles.sessionsMap__date}>
							<p className={styles.date__text}>{date}</p>
						</div>
						{sessions.map(session => (
							<ContentBlockLayout
								key={session.id}
								className={styles.sessionCard}
							>
								<SessionCard session={session} />
							</ContentBlockLayout>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
