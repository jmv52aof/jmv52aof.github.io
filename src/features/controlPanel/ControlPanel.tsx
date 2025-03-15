import ControlButton from '@components/ui/controlButton/ControlButton'
import styles from './styles.module.scss'
import stationsImage from '@assets/images/menu/stations.svg'
import chargingSessionsImage from '@assets/images/menu/charging-sessions.svg'
import paymentMethodImage from '@assets/images/menu/payment-method.svg'
import rfidCardImage from '@assets/images/menu/rfid-card.svg'
import supportImage from '@assets/images/menu/support.svg'
import { useNavigate } from 'react-router'
import {
	SESSIONS_HISTORY_ENDPOINT,
	STATIONS_LIST_ENDPOINT,
} from '@common/consts/endpoints'

/**
 * Панель управления, содержащая основные функции (кнопки) приложения:
 * 1) Список станций
 * 2) История зарядных сессий пользователя
 * 3) Способ оплаты пользователя
 * 4) Карта RFID пользователя
 * 5) Техподдержка
 */
export default function ControlPanel(): React.JSX.Element {
	const nav = useNavigate()

	return (
		<div className={styles.panel}>
			<ControlButton
				iconSrc={stationsImage}
				onClick={() => nav(STATIONS_LIST_ENDPOINT)}
			/>
			<ControlButton
				iconSrc={chargingSessionsImage}
				onClick={() => nav(SESSIONS_HISTORY_ENDPOINT)}
			/>
			<ControlButton iconSrc={paymentMethodImage} onClick={() => {}} />
			<ControlButton iconSrc={rfidCardImage} onClick={() => {}} />
			<ControlButton iconSrc={supportImage} onClick={() => {}} />
		</div>
	)
}
