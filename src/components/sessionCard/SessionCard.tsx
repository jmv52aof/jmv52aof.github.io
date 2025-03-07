import styles from './styles/sessionCard.module.scss'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import SessionConnector from './components/sessionConnector/SessionConnector'

type Props = {
	session: ChargingSessionDto
}

export default function SessionCard(props: Props): React.JSX.Element {
	return (
		<div className={styles.sessionCard}>
			<div className={styles.sessionCard__header}>
				<div className={styles.header__connector}>
					<SessionConnector
						connector={props.session.connector_info}
					/>
				</div>
			</div>
		</div>
	)
}
