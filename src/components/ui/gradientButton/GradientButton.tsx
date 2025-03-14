import styles from './styles.module.scss'
import { GradientTemplate } from './lib/types'
import alertImage from '@assets/images/danger-circle.svg'
import arrowImage from '@assets/images/arrow-right.svg'

type Props = {
	onClick: () => void
	gradientTemplate: GradientTemplate
}

export default function GradientButton(props: Props) {
	return (
		<button
			onClick={props.onClick}
			className={`${styles.gradientButton} ${
				styles[props.gradientTemplate]
			}`}
		>
			<div className={styles.button__alert}>
				<img className={styles.alert__icon} src={alertImage} />
				<div className={styles.alert__message}>
					<p className={styles.message__text}>Сессия не оплачена</p>
				</div>
			</div>
			<img className={styles.button__arrowIcon} src={arrowImage} />
		</button>
	)
}
