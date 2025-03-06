import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ConnectorStandard } from '@common/types/stations'
import { CONNECTOR_HAS_ICON } from '@common/consts/stations'

type Props = {
	onChange: (enabled: boolean) => void
	enabled?: boolean
	connector: ConnectorStandard
	disabled?: boolean
}

export default function ConnectorCard(props: Props) {
	const [isEnabled, setIsEnabled] = useState<boolean>(props.enabled ?? true)

	useEffect(() => {
		setIsEnabled(props.enabled ?? true)
	}, [props.enabled])

	const handleClick = () => {
		if (!props.disabled) {
			setIsEnabled(!isEnabled)
			props.onChange(!isEnabled)
		}
	}

	return (
		<div
			className={`${styles.card} ${isEnabled ? styles.card_enabled : ''} ${
				props.disabled ? styles.card_disabled : ''
			}`}
			onClick={handleClick}
		>
			<div className={styles.card__content}>
				<div className={styles.content__icon}>
					<img
						src={CONNECTOR_HAS_ICON[props.connector]}
						alt={props.connector}
					/>
				</div>
				<a className={styles.content__text}>{props.connector}</a>
			</div>
		</div>
	)
}
