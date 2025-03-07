import styles from './styles/sessionCard.module.scss'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import SessionConnector from './components/sessionConnector/SessionConnector'
import Status from '@components/ui/status/Status'
import { CHARGING_SESSION_COLORS } from '@common/consts/chargingSessions'
import ProfileButton from './components/profileButton/ProfileButton'

type Props = {
	session: ChargingSessionDto
}

export default function SessionCard(props: Props): React.JSX.Element {
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
								onClick={() => console.log('Клик')}
								variant={
									props.session.status === 'Зарядка'
										? 'arrow'
										: 'standard'
								}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.horizontalSplit} />
		</div>
	)
}
