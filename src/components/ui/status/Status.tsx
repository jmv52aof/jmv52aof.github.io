import { ColorTemplate, TextSize } from '../status/lib/types'
import styles from './styles.module.scss'

type Props = {
	color: ColorTemplate
	text: string
	textSize: TextSize
	className?: string
}

/**
 * Блок с отображением статуса: соответствующие цвет и текст
 */
export default function Status(props: Props): React.JSX.Element {

	const color = props.color

	const textSizeMap: Record<TextSize, number> = {
		small: 10,
		medium: 12,
		large: 14,
	};

	const textSize = {
		fontSize: textSizeMap[props.textSize] + 'px'
	}



	return (
		<div
			className={`${styles.status} ${props.className || ""} ${styles[color]}`}
		>
			<p className={styles.text} style={textSize}> 
				{props.text} 
			</p>
		</div>
	)
}
