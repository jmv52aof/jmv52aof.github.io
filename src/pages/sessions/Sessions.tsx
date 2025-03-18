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
import { useContext } from 'react'
import PageLayout from '@layouts/pageLayout/PageLayout'
import { useChargingSessionsLoader } from './lib/hooks'
import { RootStateContext } from '@contexts/RootStateContext'

/**
 * Страница с зарядными сессиями
 */
export default function SessionsPage(): React.JSX.Element {
	const nav = useNavigate()
	const { sessions, setSessions } = useContext(RootStateContext)
	const { getByOffsetAndLimit, loading } = useChargingSessionsLoader()

	const onSessionsFiltersClick = () => {
		nav(SESSIONS_HISTORY_FILTERS_ENDPOINT)
	}

	const createSessionItems = (
		data: ChargingSessionDto[],
		offset?: number,
		limit?: number
	) => {
		const groupedSessions = groupSessionsByDate(data)
		const dates = Object.keys(groupedSessions)
		const slicedDates =
			undefined !== offset && undefined !== limit
				? dates.slice(offset, offset + limit)
				: dates
		const items = slicedDates.flatMap(date => {
			const [day, month, _] = date.split(' ')

			return [
				<div key={`date-${date}`} className={styles.sessionsMap__date}>
					<p className={styles.date__text}>{`${day} ${month}`} </p>
				</div>,
				...groupedSessions[date].map((session, index) => (
					<ContentBlockLayout key={index} className={styles.main__sessionCard}>
						<SessionCard session={session} />
					</ContentBlockLayout>
				)),
			]
		})
		return items
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
				items={createSessionItems(sessions)}
				loading={loading}
				getData={async (offset, limit) => {
					const data = await getByOffsetAndLimit(offset, limit)
					return createSessionItems(data)
				}}
				onDataLoad={data => setSessions(data as ChargingSessionDto[])}
			/>
		</PageLayout>
	)
}
