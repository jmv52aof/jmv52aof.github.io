import styles from './styles/sessionCard.module.scss'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import SessionConnector from './components/sessionConnector/SessionConnector'
import Status from '@components/ui/status/Status'
import { CHARGING_SESSION_STATUS_HAS_COLOR } from '@common/consts/chargingSessions'
import { useNavigate } from 'react-router'
import { SESSION_PROFILE_ENDPOINT } from '@common/consts/endpoints'
import { STATION_PROFILE_ENDPOINT } from '@common/consts/endpoints'
import GradientButton from '@components/ui/gradientButton/GradientButton'
import SessionValues from './components/sessionValues/SessionValues'
import Button from '@components/ui/filtersButton/FiltersButton'
import profileImage from '@assets/images/square-share-line.svg'
import arrowRightImage from '@assets/images/arrow-right.svg'
import { createQueryString } from '@common/functions/strings'
import {
	ChargingSessionPageQueryArguments,
	ChargingSessionPreviousPageQueries,
	StationProfilePageQueryArguments,
	StationProfilePreviousPageQueries,
} from '@common/consts/pages'
import { useContext } from 'react'
import { RootStateContext } from '@contexts/RootStateContext'

type Props = {
	session: ChargingSessionDto
	onDebtClick?: () => void
}

export default function SessionCard(props: Props): React.JSX.Element {
	const { lastStoppedChargingSessionId } = useContext(RootStateContext)

	const isStoppedSession = props.session.id === lastStoppedChargingSessionId
	const isCharging = props.session.status === 'Зарядка'
	const isUnpaid = props.session.payment_status === 'Неоплачено'

	const nav = useNavigate()

	const onSessionClick = () => {
		nav(
			SESSION_PROFILE_ENDPOINT +
				props.session.id +
				createQueryString([
					{
						key: ChargingSessionPageQueryArguments.PREVIOUS_PAGE,
						value: ChargingSessionPreviousPageQueries.SESSIONS_LIST,
					},
				])
		)
	}

	const onStationClick = () => {
		nav(
			STATION_PROFILE_ENDPOINT +
				props.session.connector_info.station_id +
				createQueryString([
					{
						key: StationProfilePageQueryArguments.PREVIOUS_PAGE,
						value: StationProfilePreviousPageQueries.SESSIONS_LIST,
					},
				])
		)
	}

	return (
		<div className={styles.sessionCard}>
			<div className={styles.sessionCard__header}>
				<div className={styles.header__content}>
					<div className={styles.content__connector}>
						<SessionConnector connector={props.session.connector_info} />
					</div>
					<div className={styles.content__station}>
						<div className={styles.station__mainInfo}>
							<div className={styles.mainInfo__texts}>
								<p className={styles.texts__name}>
									{props.session.connector_info.station_name}
								</p>
								<p className={styles.texts__address}>
									{props.session.connector_info.station_address}
								</p>
							</div>
							<Status
								textSize='medium'
								text={props.session.status}
								color={CHARGING_SESSION_STATUS_HAS_COLOR[props.session.status]}
							/>
						</div>
						<div className={styles.station__button}>
							<Button
								onClick={
									isCharging && !isStoppedSession
										? onSessionClick
										: onStationClick
								}
								variant='fill'
								iconSrc={
									isCharging && !isStoppedSession
										? arrowRightImage
										: profileImage
								}
							/>
						</div>
					</div>
				</div>
			</div>
			<SessionValues isActive={isCharging} sessionValues={props.session} />
			{isUnpaid && (
				<div className={styles.sessionCard__gradientButton}>
					<GradientButton
						text='Сессия не оплачена'
						onClick={props.onDebtClick}
						gradientTemplate='orange'
					/>
				</div>
			)}
		</div>
	)
}
