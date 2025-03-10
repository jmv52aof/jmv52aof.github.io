import styles from './styles/sessionCard.module.scss'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import SessionConnector from './components/sessionConnector/SessionConnector'
import Status from '@components/ui/status/Status'
import { CHARGING_SESSION_COLORS } from '@common/consts/chargingSessions'
import ProfileButton from './components/profileButton/ProfileButton'
import { useNavigate } from 'react-router'
import { SESSION_PROFILE_ENDPOINT } from '@common/consts/endpoints'
import { STATION_PROFILE_ENDPOINT } from '@common/consts/endpoints'
import GradientButton from '@components/ui/gradientButton/GradientButton'
import SessionValues from './components/sessionValues/SessionValues'

type Props = {
	session: ChargingSessionDto
}

export default function SessionCard(props: Props): React.JSX.Element {
	const isCharging = props.session.status === 'Зарядка'
	const isUnpaid = props.session.payment_status === 'Неоплачено'

	const nav = useNavigate()

	const onSessionClick = () => {
		nav(SESSION_PROFILE_ENDPOINT)
	}

	const onStationClick = () => {
		nav(STATION_PROFILE_ENDPOINT)
	}

	return (
		<div className={styles.sessionCard}>
			<div className={styles.sessionCard__header}>
				<div className={styles.header__content}>
					<div className={styles.content__connector}>
						<SessionConnector
							connector={props.session.connector_info}
						/>
					</div>
					<div className={styles.content__station}>
						<div className={styles.station__mainInfo}>
							<div className={styles.mainInfo__texts}>
								<p className={styles.texts__name}>
									{props.session.connector_info.station_name}
								</p>
								<p className={styles.texts__address}>
									{
										props.session.connector_info
											.station_address
									}
								</p>
							</div>
							<Status
								textSize='medium'
								text={props.session.status}
								color={
									CHARGING_SESSION_COLORS[
										props.session.status
									]
								}
							/>
						</div>
						<div className={styles.station__button}>
							<ProfileButton
								onClick={
									isCharging ? onSessionClick : onStationClick
								}
								variant={isCharging ? 'arrow' : 'standard'}
							/>
						</div>
					</div>
				</div>
			</div>
			<SessionValues
				isActive={isCharging}
				sessionValues={props.session}
			/>
			{isUnpaid && (
				<GradientButton onClick={() => {}} gradientTemplate='orange' />
			)}
		</div>
	)
}
