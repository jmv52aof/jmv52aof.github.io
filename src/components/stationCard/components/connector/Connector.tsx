import styles from '../../styles/connector.module.scss'
import Status from '@components/ui/status/Status'
import {
	CONNECTOR_HAS_ICON,
	CONNECTOR_STATUS_COLORS,
} from '@common/consts/stations'
import { ConnectorDto } from '@common/types/stations'

type Props = {
	connector: ConnectorDto
	isLast: boolean
}

export default function Connector(props: Readonly<Props>) {
	return (
		<div className={styles.connector}>
			<div className={styles.connector__wrap}>
				<img
					src={CONNECTOR_HAS_ICON[props.connector.standard]}
					alt={props.connector.standard}
					className={styles.connector__icon}
				/>
				<div className={styles.connector__content}>
					<div className={styles.content__main}>
						<p className={styles.main__standard}>{props.connector.standard}</p>
						<p className={styles.main__power}>
							{props.connector.max_electric_power} кВт
						</p>
					</div>
					<div className={styles.content__additional}>
						<div className={styles.additional__verticalSplit}></div>
						<Status
							textSize='small'
							text={props.connector.status}
							color={CONNECTOR_STATUS_COLORS[props.connector.status]}
						/>
					</div>
				</div>
			</div>
			{!props.isLast && (
				<div className={styles.connector__horizontalSplit}></div>
			)}
		</div>
	)
}
