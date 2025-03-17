import { RootStateContext } from 'contexts/RootStateContext'
import { useContext } from 'react'
import RfidCardComponent from '@components/rfidCard/RfidCard'
import styles from './styles.module.scss'
import warningImage from '@assets/images/status/warning.svg'

export default function RfidCard(): React.JSX.Element {
	const { rfidCard } = useContext(RootStateContext)

	if (rfidCard) {
		return <RfidCardComponent card={rfidCard} />
	}

	return (
		<div className={styles.card}>
			<a className={styles.card__title}>Карта RFID не привязана</a>
			<img className={styles.card__icon} src={warningImage} alt='Warning' />
			<a className={styles.card__description}>
				Без зарядной карты вы не сможете заряжаться на станциях
			</a>
		</div>
	)
}
