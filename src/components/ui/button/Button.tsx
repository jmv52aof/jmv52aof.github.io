import { expandVariant } from './lib/functions'
import { Variant } from './lib/types'
import styles from './styles.module.scss'

type Props = {
	onClick: () => void
	variant: Variant
	text?: string
	iconSrc?: string
	disabled?: boolean
	loading?: boolean
}

/**
 * Кнопка с несколькими вариациями. Общий компонент кнопки, который следует использовать
 * в большинстве случаев
 */
export default function Button(props: Props): React.JSX.Element {
	const onClickHandler = () => {
		if (!props.loading && !props.disabled) props.onClick()
	}

	const variant = expandVariant(props.variant, !!props.iconSrc)

	return (
		<button
			onClick={onClickHandler}
			disabled={props.disabled}
			className={`${styles.button} ${styles[variant]} ${
				props.disabled ? styles[variant + 'Disabled'] : ''
			}`}
		>
			{props.iconSrc && !props.loading && (
				<img src={props.iconSrc} alt='Icon' />
			)}
			{props.text && !variant.startsWith('icon') && <a>{props.text}</a>}
		</button>
	)
}
