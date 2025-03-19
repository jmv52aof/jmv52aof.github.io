import { ChargingSessionDto } from '@common/types/chargingSessions'
import Button from '@components/ui/button/Button'
import styles from './styles/session.module.scss'
import ContentBlock from '@components/contentBlock/ContentBlock'
import lightingIcon from '@assets/images/lighting.svg'
import batteryChargeIcon from '@assets/images/battery-charge.svg'
import clockIcon from '@assets/images/clock.svg'
import { checkVisible } from './lib/functions'
import {
	dateToTimestamp,
	getTimesDifference,
	timeToISOString,
	timeToStringWithUnitsOfMeasurement,
} from '@common/functions/date'
import ChargingSessionActivePower from './components/ActivePower'
import ChargingSessionConnectorInfo from './components/ConnectorInfo'
import { useContext, useState } from 'react'
import PopupWrapper from '@features/popupWrapper/PopupWrapper'
import ConfirmationPopupContent from '@components/confirmationPopupContent/ConfirmationPopupContent'
import { useApi } from '@common/hooks/api'
import { useNavigate } from 'react-router'
import { SESSIONS_HISTORY_ENDPOINT } from '@common/consts/endpoints'
import { RootStateContext } from '@contexts/RootStateContext'

interface Props {
	chargingSession: ChargingSessionDto
}

export default function ChargingSession(props: Props): React.JSX.Element {
	const nav = useNavigate()

	const { showSnackbar } = useContext(RootStateContext)
	const { stopChargingSessionFromApi } = useApi()

	const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)

	const duration =
		props.chargingSession.end_date === undefined
			? getTimesDifference(
					dateToTimestamp(new Date()),
					props.chargingSession.start_date
			  )
			: getTimesDifference(
					props.chargingSession.end_date,
					props.chargingSession.start_date
			  )

	return (
		<>
			<PopupWrapper isOpen={popupIsOpen} onClose={() => setPopupIsOpen(false)}>
				<ConfirmationPopupContent
					title={
						<>
							Хотите завершить <br /> зарядную сессию?
						</>
					}
					errorTitle={
						<>
							Не удалось завершить <br /> зарядную сессию
						</>
					}
					onConfirm={() =>
						stopChargingSessionFromApi({ id: props.chargingSession.id })
					}
					onSuccess={() => {
						nav(SESSIONS_HISTORY_ENDPOINT)
						showSnackbar('success', 'Зарядка завершена')
					}}
					onClose={() => setPopupIsOpen(false)}
				/>
			</PopupWrapper>

			<ChargingSessionActivePower
				power={props.chargingSession.current_power ?? 0}
				maxPower={props.chargingSession.connector_info.max_electric_power ?? 0}
			/>
			<div className={styles.buttonBlock}>
				<Button
					variant='fill'
					onClick={() => setPopupIsOpen(true)}
					text='Завершить'
				/>
			</div>
			<div className={styles.info}>
				<ChargingSessionConnectorInfo
					sessionId={props.chargingSession.id}
					connectorInfo={props.chargingSession.connector_info}
					tariffs={props.chargingSession.tariffs}
				/>
				<ContentBlock
					title={'Заряд:'}
					iconSrc={batteryChargeIcon}
					items={[
						{
							description: 'Заряжено:',
							value: `${props.chargingSession.charged_kwh} кВт·ч`,
						},
						{
							description: 'Процент батареи:',
							value: !!props.chargingSession.battery_percentage
								? `${props.chargingSession.battery_percentage} %`
								: '',
							checkVisible: checkVisible,
						},
					]}
				/>
				<ContentBlock
					title={'Время и длительность:'}
					iconSrc={clockIcon}
					items={[
						{
							description: 'Старт:',
							value: timeToISOString(
								props.chargingSession.start_date.hours,
								props.chargingSession.start_date.minutes,
								props.chargingSession.start_date.seconds
							),
						},
						{
							description: 'Длительность:',
							value: timeToStringWithUnitsOfMeasurement(
								duration.hours,
								duration.minutes,
								duration.seconds
							),
						},
					]}
				/>
				{!!props.chargingSession.current_power && (
					<ContentBlock
						title={'Мощность: '}
						iconSrc={lightingIcon}
						items={[
							{
								description: 'Максимальная:',
								value: !!props.chargingSession.max_power
									? `${props.chargingSession.max_power} кВт`
									: '',
								checkVisible: checkVisible,
							},
							{
								description: 'Минимальная:',
								value: !!props.chargingSession.min_power
									? `${props.chargingSession.min_power} кВт`
									: '',
								checkVisible: checkVisible,
							},
							{
								description: 'Текущая:',
								value: !!props.chargingSession.current_power
									? `${props.chargingSession.current_power} кВт`
									: '',
								checkVisible: checkVisible,
							},
							{
								description: 'Средняя:',
								value:
									!!props.chargingSession.min_power &&
									!!props.chargingSession.max_power
										? `${
												(props.chargingSession.max_power +
													props.chargingSession.min_power) /
												2
										  } кВт`
										: '',
								checkVisible: checkVisible,
							},
						]}
					/>
				)}
			</div>
		</>
	)
}
