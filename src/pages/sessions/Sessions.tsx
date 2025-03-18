import styles from './styles.module.scss'
import FiltersButton from '@components/ui/filtersButton/FiltersButton'
import tuningImage from '@assets/images/tuning.svg'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import SessionCard from '@components/sessionCard/SessionCard'
import { useNavigate } from 'react-router'
import { SESSIONS_HISTORY_FILTERS_ENDPOINT } from '@common/consts/endpoints'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import { groupSessionsByDate } from './lib/functions'
import ListLayout from '@layouts/listLayout/ListLayout'
import { useState, useEffect } from 'react'
import PageLayout from '@layouts/pageLayout/PageLayout'

/**
 * Страница с зарядными сессиями
 */
export default function SessionsPage(): React.JSX.Element {
	const [loading, setLoading] = useState(true)
	const [listLayoutItems, setListLayoutItems] = useState<React.JSX.Element[]>(
		[]
	)
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
				standard: 'CCS2',
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
				minutes: 2,
				seconds: 48,
			},
			end_date: {
				year: 2025,
				month: 2,
				day: 7,
				hours: 14,
				minutes: 50,
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
				standard: 'CCS2',
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
				minutes: 2,
				seconds: 48,
			},
			end_date: {
				year: 2025,
				month: 2,
				day: 7,
				hours: 14,
				minutes: 50,
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
				minutes: 2,
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
				minutes: 2,
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
				minutes: 2,
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

	const createSessionItems = (offset: number, limit: number) => {
		const dates = Object.keys(groupedSessions)
		const slicedDates = dates.slice(offset, offset + limit)
		const items = slicedDates.flatMap(date => {
			const [day, month, _] = date.split(' ')

			return [
				<div key={`date-${date}`} className={styles.sessionsMap__date}>
					<p className={styles.date__text}>{`${day} ${month}`} </p>
				</div>,
				...groupedSessions[date].map(session => (
					<ContentBlockLayout key={session.id} className={styles.sessionCard}>
						<SessionCard session={session} />
					</ContentBlockLayout>
				)),
			]
		})
		return items
	}

	const getData = (
		offset: number,
		limit: number
	): Promise<React.JSX.Element[]> => {
		return new Promise<React.JSX.Element[]>(resolve => {
			setTimeout(() => {
				const chunk = createSessionItems(offset, limit)
				resolve(chunk)
			}, 1000)
		}).finally(() => {
			setLoading(false)
		})
	}

	useEffect(() => {
		getData(0, 10).then(initialData => {
			setListLayoutItems(initialData)
		})
	}, [])

	const totalSessionsCount = Object.keys(groupedSessions).length

	const onDataLoad = () => {
		if (
			listLayoutItems.length > 0 &&
			listLayoutItems.length < totalSessionsCount
		) {
			const nextOffset = listLayoutItems.length
			getData(nextOffset, 15).then(newData => {
				if (newData && newData.length > 0) {
					setListLayoutItems(prevItems => [...prevItems, ...newData])
				}
			})
		}
	}

	return (
		<PageLayout
			onReturn={() => nav('/')}
			title='Зарядные сессии'
			headerContent={
				<FiltersButton
					iconSrc={tuningImage}
					onClick={onSessionsFiltersClick}
					variant='fill'
				/>
			}
		>
			<ListLayout
				items={listLayoutItems}
				loading={loading}
				getData={getData}
				onDataLoad={onDataLoad}
			/>
		</PageLayout>
	)
}
