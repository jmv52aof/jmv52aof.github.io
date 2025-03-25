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
import { useContext, useState } from 'react'
import PageLayout from '@layouts/pageLayout/PageLayout'
import { useChargingSessionsLoader } from './lib/hooks'
import { RootStateContext } from '@contexts/RootStateContext'
import EmptyDataNotification from '@components/emptyDataNotification/EmptyDataNotification'
import documentsImage from '@assets/images/documents.svg'
import { ChargingSessionDebtPopup } from './lib/types'
import PopupWrapper from '@features/popupWrapper/PopupWrapper'
import ConfirmationPopupContent from '@components/confirmationPopupContent/ConfirmationPopupContent'
import { useApi } from '@common/hooks/api'

/**
 * Страница с зарядными сессиями
 */
export default function SessionsPage(): React.JSX.Element {
	const nav = useNavigate()

	const { retryPaymentForChargingSessionFromApi } = useApi()
	const { sessions, setSessions, showSnackbar } = useContext(RootStateContext)
	const { getByOffsetAndLimit, loading } = useChargingSessionsLoader()

	const [popup, setPopup] = useState<ChargingSessionDebtPopup>({
		isOpen: false,
	})

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
						<SessionCard
							session={session}
							onDebtClick={() => {
								if (session.payment_status === 'Неоплачено') {
									setPopup({
										isOpen: true,
										sessionId: session.id,
									})
								}
							}}
						/>
					</ContentBlockLayout>
				)),
			]
		})
		return items
	}

	const onPopupClose = () => {
		setPopup({
			isOpen: false,
			sessionId: undefined,
		})
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
			<PopupWrapper
				isOpen={popup.isOpen && undefined !== popup.sessionId}
				onClose={onPopupClose}
			>
				<ConfirmationPopupContent
					title={
						<>
							Хотите оплатить <br /> задолженность?
						</>
					}
					errorTitle={
						<>
							Не удалось произвести <br /> оплату
						</>
					}
					onConfirm={() =>
						retryPaymentForChargingSessionFromApi({
							sessionId: popup.sessionId as string,
						})
					}
					onSuccess={() => showSnackbar('success', 'Оплата успешно прошла')}
					onClose={onPopupClose}
				/>
			</PopupWrapper>

			<ListLayout
				items={createSessionItems(sessions)}
				loading={loading}
				getData={async (offset, limit) => {
					return await getByOffsetAndLimit(offset, limit)
				}}
				onDataLoad={data => {
					setSessions(data as ChargingSessionDto[])
				}}
				fullHeight
				emptyListNotify={
					<EmptyDataNotification
						text='Здесь будут показаны ваши зарядные сессии'
						iconSrc={documentsImage}
					/>
				}
			/>
		</PageLayout>
	)
}
