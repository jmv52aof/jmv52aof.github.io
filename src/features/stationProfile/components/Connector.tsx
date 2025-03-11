import { ConnectorDto } from '@common/types/stations'
import React from 'react'
import styles from '../styles/styles.module.scss'
import Status from '@components/ui/status/Status'
import { statusColorMap, standardMap, powerTypeMap } from './lib/types'
import wallet from '@assets/images/wallet.svg'
type Props = {
	info: ConnectorDto
}

/**
 * Карточка коннектора
 */
export default function Connector(props: Props): React.JSX.Element {
	return (
		<div className={styles.connectorCard}>
			<Status
				text={props.info.status}
				color={statusColorMap[props.info.status]}
				textSize='medium'
				className={styles.connector__status}
			></Status>
			<p className={styles.text_title}>{props.info.standard}</p>
			<img
				src={standardMap[props.info.standard]}
				className={styles.connector__image}
				alt='connector type'
			/>
			<div className={styles.connector__info}>
				<div className={styles.left_column}>
					<p className={styles.text}>{props.info.max_electric_power} кВт</p>
					<p className={styles.text}>{props.info.max_amperage} А</p>
				</div>
				<div className={styles.right_column}>
					<p className={styles.text}>{props.info.format}</p>
					<p
						className={`${styles.text} ${
							powerTypeMap[props.info.power_type] === 'green'
								? styles.text_green
								: styles.text_orange
						}`}
					>
						{props.info.power_type}
					</p>
				</div>
			</div>
			<div className={styles.connector__line_separator}></div>
			<div className={styles.connector__price}>
				<img src={wallet} alt='price'></img>
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
