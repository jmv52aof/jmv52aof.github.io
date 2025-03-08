import styles from './styles/sessionCard.module.scss'
import { ChargingSessionDto } from '@common/types/chargingSessions'
import SessionConnector from './components/sessionConnector/SessionConnector'
import Status from '@components/ui/status/Status'
import { CHARGING_SESSION_COLORS } from '@common/consts/chargingSessions'
import ProfileButton from './components/profileButton/ProfileButton'
import { useNavigate } from 'react-router'
import { SESSION_PROFILE_ENDPOINT } from '@common/consts/endpoints'
import { STATION_PROFILE_ENDPOINT } from '@common/consts/endpoints'
import batteryImage from '@assets/images/battery-charge.svg'
import clockImage from '@assets/images/clock.svg'
import paymentImage from '@assets/images/payment.svg'
import GradientButton from '@components/ui/gradientButton/GradientButton'

type Props = {
	session: ChargingSessionDto
}

export default function SessionCard(props: Props): React.JSX.Element {
	const isCharging = props.session.status === 'Зарядка'
	const isUnpaid = props.session.payment_status === 'Неоплачено'

	const nav = useNavigate()

	const onSessionClick = () => {
		nav(SESSION_PROFILE_ENDPOINT)
	}

	const onStationClick = () => {
		nav(STATION_PROFILE_ENDPOINT)
	}

	return (
		<div className={styles.sessionCard}>
			<div className={styles.sessionCard__header}>
				<div className={styles.header__content}>
					<div className={styles.content__connector}>
						<SessionConnector
							connector={props.session.connector_info}
						/>
					</div>
					<div className={styles.content__station}>
						<div className={styles.station__mainInfo}>
							<div className={styles.mainInfo__texts}>
								<p className={styles.texts__name}>
									{props.session.connector_info.station_name}
								</p>
								<p className={styles.texts__address}>
									{
										props.session.connector_info
											.station_address
									}
								</p>
							</div>
							<Status
								textSize='medium'
								text={props.session.status}
								color={
									CHARGING_SESSION_COLORS[
										props.session.status
									]
								}
							/>
						</div>
						<div className={styles.station__button}>
							<ProfileButton
								onClick={
									isCharging ? onSessionClick : onStationClick
								}
								variant={isCharging ? 'arrow' : 'standard'}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.horizontalSplit} />
			<div className={styles.sessionCard__chargingInfo}>
				<div className={styles.chargingInfo__icon}>
					<img
						src={batteryImage}
						alt={'batteryImage'}
						className={styles.chargingInfo__icon}
					/>
				</div>
				<div className={styles.chargingInfo__texts}>
					<div className={styles.texts__row}>
						<p className={styles.row__label}>Заряжено:</p>
						<p className={styles.row__value}>
							{props.session.charged_kwh} кВт*ч
						</p>
					</div>
					<div className={styles.texts__row}>
						<p className={styles.row__label}>
							Максимальная мощность:
						</p>
						<p className={styles.row__value}>
							{props.session.max_power} кВт
						</p>
					</div>
					<div className={styles.texts__row}>
						<p className={styles.row__label}>
							Минимальная мощность:
						</p>
						<p className={styles.row__value}>
							{props.session.min_power} кВт
						</p>
					</div>
				</div>
			</div>
			<div className={styles.horizontalSplit} />
			<div className={styles.sessionCard__session}>
				<div className={styles.session__icon}>
					<img
						src={clockImage}
						alt={'clockImage'}
						className={styles.session__icon}
					/>
				</div>
				<div className={styles.session__times}>
					<div className={styles.times__start}>
						<p className={styles.row__label}>Старт:</p>
						<p className={styles.row__value}>
							{props.session.start_date.hours}:
							{props.session.start_date.minutes}:
							{props.session.start_date.seconds}
						</p>
					</div>
					<div className={styles.times__duration}>
						<p className={styles.row__label}>Длительность:</p>
						<p className={styles.row__value}>1ч 48м</p>
					</div>
				</div>
			</div>
			<div className={styles.horizontalSplit} />
			<div className={styles.sessionCard__payment}>
				<div className={styles.payment__icon}>
					<img
						src={paymentImage}
						alt={'paymentImage'}
						className={styles.payment__icon}
					/>
				</div>
				<div className={styles.payment__texts}>
					<div className={styles.texts__amount}>
						<p className={styles.row__label}>Сумма:</p>
						<p className={styles.row__value}>
							{props.session.total_cost} руб.
						</p>
					</div>
					<div className={styles.texts__paymentMethod}>
						<p className={styles.row__label}>Способ оплаты:</p>
						<p className={styles.row__value}>
							{props.session.payment_method}
						</p>
					</div>
				</div>
			</div>
			{isUnpaid && (
				<GradientButton onClick={() => {}} gradientTemplate='orange' />
			)}
		</div>
	)
}
