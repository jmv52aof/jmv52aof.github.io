import { Variant } from '../status/lib/types'
import styles from './styles.module.scss'

type Props = {
	onClick: () => void
	variant: Variant
	text?: string
}

/**
 * Блок с отображением статуса: соответствующие цвет и текст
 */
export default function Status(props: Props): React.JSX.Element {

	const variant = props.variant

	return (
		<div
			className={`${styles.status} ${styles[variant]}`}
			// onClick={onClickHandler}
		>
			<p className={`${styles.text}`}> 
				{props.text} 
			</p>
		</div>
	)
}
