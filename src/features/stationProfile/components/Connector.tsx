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
import { TARIFF_TYPE_HAS_UNIT_OF_MEASUREMENT } from '@common/consts/tariffs'

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
			<div className={styles.connector__title}>{props.info.standard}</div>
			<img
				src={CONNECTOR_HAS_ICON[props.info.standard]}
				className={styles.connector__image}
				alt='Connector'
			/>
			<div className={styles.connector__info}>
				<div className={styles.info__column}>
					<a className={styles.text}>{props.info.max_electric_power} кВт</a>
					<a className={styles.text}>{props.info.max_amperage} А</a>
				</div>
				<div className={styles.info__column}>
					<a className={styles.text}>{props.info.format}</a>
					<a
						className={`${styles.text} ${
							styles['text_' + POWER_TYPE_MAP[props.info.power_type]]
						}`}
					>
						{props.info.power_type}
					</a>
				</div>
			</div>

			<div className={styles.connector__lineSeparator}></div>

			<div className={styles.connector__tariffsBlock}>
				<div className={styles.tariffsBlock__tariffs}>
					<img src={wallet} alt='Wallet' className={styles.tariffs__icon} />
					<div className={styles.tariffs__list}>
						{props.info.tariffs.map((tariff, index) => (
							<a key={index} className={styles.text_blue}>
								{tariff.price} {tariff.currency}/
								{TARIFF_TYPE_HAS_UNIT_OF_MEASUREMENT[tariff.type]}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
