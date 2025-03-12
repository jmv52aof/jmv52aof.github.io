import { ConnectorDto } from '@common/types/stations'
import React from 'react'
import styles from '../styles/styles.module.scss'
import Status from '@components/ui/status/Status'
import { POWER_TYPE_MAP } from './lib/types'
import {
	CONNECTOR_HAS_ICON,
	CONNECTOR_STATUS_COLORS,
} from '@common/consts/stations'

import wallet from '@assets/images/wallet.svg'

type Props = {
	info: ConnectorDto
}

/**
 * Карточка коннектора
 */
export default function Connector(props: Props): React.JSX.Element {
	return (
		<div className={styles.connector}>
			<Status
				text={props.info.status}
				color={CONNECTOR_STATUS_COLORS[props.info.status]}
				textSize='medium'
				className={styles.connector__status}
			/>
			<p className={styles.title}>{props.info.standard}</p>
			<img
				src={CONNECTOR_HAS_ICON[props.info.standard]}
				className={styles.connector__image}
				alt='connector type'
			/>
			<div className={styles.connector__info}>
				<div className={styles.info__leftColumn}>
					<p className={styles.text}>{props.info.max_electric_power} кВт</p>
					<p className={styles.text}>{props.info.max_amperage} А</p>
				</div>
				<div className={styles.info__rightColumn}>
					<p className={styles.text}>{props.info.format}</p>
					<p
						className={`${styles.text} ${
							POWER_TYPE_MAP[props.info.power_type] === 'green'
								? styles.text_green
								: styles.text_orange
						}`}
					>
						{props.info.power_type}
					</p>
				</div>
			</div>
			<div className={styles.connector__lineSeparator}></div>
			<div className={styles.connector__price}>
				<img src={wallet} alt='price' />
				<div className={styles.connector__tariffs}>
					{props.info.tariffs.map((tariff, index) => (
						<p key={index} className={styles.text_blue}>
							{tariff.price} {tariff.currency}
						</p>
					))}
				</div>
			</div>
		</div>
	)
}
