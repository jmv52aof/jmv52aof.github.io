import { ConnectorDto, ConnectorStatus } from '@common/types/stations'
import React from 'react'
import styles from '../styles/styles.module.scss'
import Status from '@components/ui/status/Status'
type Props = {
	info: ConnectorDto
}

/**
 * Карточка коннектора
 */
export default function Connector(props: Props): React.JSX.Element {
	const statusColorMap: Record<ConnectorStatus, string> = {
		// "Доступен": "green",
		// "Занят": "green",
		// "Недоступен": "green",
		// "Нет соединения": "green",
		// "Отключен": "green"
	}

	return (
		<div className={styles.connectorBorder}>
			<Status text={props.info.status} color='' textSize='medium'></Status>
			<p>что</p>
		</div>
	)
}
