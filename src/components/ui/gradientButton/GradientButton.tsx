import styles from './styles.module.scss'
import { GradientTemplate } from './lib/types'
import alertImage from '@assets/images/danger-circle.svg'
import arrowRight from '@assets/images/arrow-right.svg'

type Props = {
	onClick: () => void
	gradientTemplate: GradientTemplate
}

export default function GradientButton(props: Props) {
	return (
		<button
			onClick={() => {}}
			className={`${styles.button} ${styles[props.gradientTemplate]}`}
		>
			<div className={styles.button__alert}>
				<div className={styles.alert__icon}>
					<img src={alertImage} />
				</div>
				<div className={styles.alert__messege}>
					<p className={styles.messege__text}>Сессия не оплачена</p>
				</div>
			</div>
			<div className={styles.button__arrowIcon}>
				<img src={arrowRight} />
			</div>
		</button>
	)
}
