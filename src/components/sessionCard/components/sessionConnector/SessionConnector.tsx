import styles from '../../styles/sessionConnector.module.scss'
import { CONNECTOR_HAS_ICON } from '@common/consts/stations'
import { ConnectorInfoDto } from '@common/types/stations'

type Props = {
	connector: ConnectorInfoDto
}

export default function Connector(props: Readonly<Props>) {
	return (
		<div className={styles.connector}>
			<div className={styles.connector__icon}>
				<img
					src={CONNECTOR_HAS_ICON[props.connector.standard]}
					alt={props.connector.standard}
					className={styles.connector__icon}
				/>
			</div>
			<div className={styles.connector__standard}>
				<p className={styles.standard__text}>{props.connector.standard}</p>
			</div>
		</div>
	)
}
