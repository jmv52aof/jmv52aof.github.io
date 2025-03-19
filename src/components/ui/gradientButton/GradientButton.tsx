import styles from './styles.module.scss'
import { GradientTemplate } from './lib/types'
import alertImage from '@assets/images/danger-circle.svg'
import arrowImage from '@assets/images/arrow-right.svg'

type Props = {
	text: string
	onClick: () => void
	gradientTemplate: GradientTemplate
}

export default function GradientButton(props: Readonly<Props>) {
	return (
		<button
			data-gradient-button='true'
			onClick={props.onClick}
			className={`${styles.gradientButton} ${styles[props.gradientTemplate]}`}
		>
			<div className={styles.button__alert}>
				<img className={styles.alert__icon} src={alertImage} />
				<div className={styles.alert__message}>
					<p className={styles.message__text}>{props.text}</p>
				</div>
			</div>
			<img className={styles.button__arrowIcon} src={arrowImage} />
		</button>
	)
}
