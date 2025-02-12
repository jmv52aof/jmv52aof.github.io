import { ColorTemplate } from '../status/lib/types'
import styles from './styles.module.scss'

type Props = {
	color: ColorTemplate
	text: string
	textSize: number
}

/**
 * Блок с отображением статуса: соответствующие цвет и текст
 */
export default function Status(props: Props): React.JSX.Element {

	const color = props.color
	const textSize = {
		fontSize: props.textSize + 'px'
	}

	return (
		<div
			className={`${styles.status} ${styles[color]}`}
		>
			<p className={styles.text} style={textSize}> 
				{props.text} 
			</p>
		</div>
	)
}
