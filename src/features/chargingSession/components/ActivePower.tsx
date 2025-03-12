import PieChart from '@components/pieChart/PieChart'
import styles from '../styles/activePower.module.scss'
import lightingIcon from '@assets/images/lighting-fill-blue.svg'

interface Props {
	power: number
	maxPower: number
}

export default function ChargingSessionActivePower(
	props: Props
): React.JSX.Element {
	return (
		<div className={styles.power}>
			<div className={styles.power__content}>
				<img className={styles.content__icon} src={lightingIcon} />
				{props.power !== 0 && (
					<span className={styles.content__text}>{props.power} кВт</span>
				)}
			</div>
			<PieChart
				power={props.power}
				maxPower={props.maxPower}
				colorTemplate='blue'
				className={styles.power__pieChart}
			/>
		</div>
	)
}
