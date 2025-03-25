import styles from '../../styles/sessionValues.module.scss'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import batteryImage from '@assets/images/battery-charge.svg'
import clockImage from '@assets/images/clock.svg'
import paymentImage from '@assets/images/payment.svg'
import {
	dateToTimestamp,
	getTimesDifference,
	timeToISOString,
	timeToStringWithUnitsOfMeasurement,
} from '@common/functions/date'

type Props = {
	sessionValues: ChargingSessionDto
	isActive: boolean
}

export default function SessionValues(props: Props): React.JSX.Element {
	const duration =
		props.sessionValues.end_date === undefined
			? getTimesDifference(
					dateToTimestamp(new Date()),
					props.sessionValues.start_date
			  )
			: getTimesDifference(
					props.sessionValues.end_date,
					props.sessionValues.start_date
			  )

	const isDischarge = props.sessionValues.charged_kwh < 0
	const chargedKwh = isDischarge
		? props.sessionValues.charged_kwh * -1
		: props.sessionValues.charged_kwh

	return (
		<>
			<div className={styles.horizontalSplit} />
			<div className={styles.sessionCard__chargingInfo}>
				<img
					src={batteryImage}
					alt={'batteryImage'}
					className={styles.chargingInfo__icon}
				/>
				{props.isActive ? (
					<div className={styles.chargingInfo__activeSessionTexts}>
						<div className={styles.activeSessionTexts__bateryInfo}>
							<div className={styles.bateryInfo__row}>
								<p className={styles.row__label}>
									{isDischarge ? 'Разряжено' : 'Заряжено'}:
								</p>
								<p className={styles.row__value}>{chargedKwh.toFixed(2)} кВт</p>
							</div>
							{props.sessionValues.battery_percentage !== undefined && (
								<div className={styles.bateryInfo__row}>
									<p className={styles.row__label}>Процент батареи:</p>
									<p className={styles.row__value}>
										{props.sessionValues.battery_percentage?.toFixed(2)} %
									</p>
								</div>
							)}
						</div>
						<div className={styles.activeSessionTexts__powerInfo}>
							<div className={styles.powerInfo__row}>
								<p className={styles.row__label}>Мощность:</p>
								<p className={styles.row__value}>
									{props.sessionValues.current_power?.toFixed(2)} кВт
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className={styles.chargingInfo__texts}>
						<div className={styles.texts__row}>
							<p className={styles.row__label}>
								{isDischarge ? 'Разряжено' : 'Заряжено'}:
							</p>
							<p className={styles.row__value}>{chargedKwh.toFixed(2)} кВт·ч</p>
						</div>
						{props.sessionValues.max_power !== undefined && (
							<div className={styles.texts__row}>
								<p className={styles.row__label}>Максимальная мощность:</p>
								<p className={styles.row__value}>
									{props.sessionValues.max_power.toFixed(2)} кВт
								</p>
							</div>
						)}
						{props.sessionValues.min_power !== undefined && (
							<div className={styles.texts__row}>
								<p className={styles.row__label}>Минимальная мощность:</p>
								<p className={styles.row__value}>
									{props.sessionValues.min_power.toFixed(2)} кВт
								</p>
							</div>
						)}
					</div>
				)}
			</div>
			<div className={styles.horizontalSplit} />
			<div className={styles.sessionCard__session}>
				<img
					src={clockImage}
					alt={'clockImage'}
					className={styles.session__icon}
				/>
				<div className={styles.session__times}>
					<div className={styles.times__start}>
						<p className={styles.row__label}>Старт:</p>
						<p className={styles.row__value}>
							{timeToISOString(
								props.sessionValues.start_date.hours,
								props.sessionValues.start_date.minutes,
								props.sessionValues.start_date.seconds
							)}
						</p>
					</div>
					<div className={styles.times__duration}>
						<p className={styles.row__label}>Длительность:</p>
						<p className={styles.row__value}>
							{timeToStringWithUnitsOfMeasurement(
								duration.hours,
								duration.minutes,
								duration.seconds
							)}
						</p>
					</div>
				</div>
			</div>
			{!props.sessionValues.total_cost !== undefined && (
				<>
					<div className={styles.horizontalSplit} />
					<div className={styles.sessionCard__payment}>
						<img
							src={paymentImage}
							alt='paymentImage'
							className={styles.payment__icon}
						/>
						<div className={styles.payment__texts}>
							<div className={styles.texts__amount}>
								<p className={styles.row__label}>Сумма:</p>
								<p className={styles.row__value}>
									{props.sessionValues.total_cost?.toFixed(2)} руб
								</p>
							</div>
							{props.sessionValues.payment_method && (
								<div className={styles.texts__paymentMethod}>
									<p className={styles.row__label}>Способ оплаты:</p>
									<p className={styles.row__value}>
										{props.sessionValues.payment_method}
									</p>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</>
	)
}
