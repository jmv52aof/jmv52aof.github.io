import React from 'react'
import styles from './styles.module.scss'
import { Variant } from './lib/types'
import { Loader } from '../loader/Loader'

type Props = {
	text: string
	onClick: () => void
	variant: Variant
	disabled?: boolean
	loading?: boolean
}

export default function ActionButton(
	props: Readonly<Props>
): React.JSX.Element {
	return (
		<button
			className={`${styles.actionButton} ${
				styles[`actionButton_${props.variant}`]
			} ${props.disabled || props.loading ? styles.actionButton_disabled : ''}`}
			onClick={() => {
				if (!props.loading && !props.disabled) props.onClick()
			}}
			disabled={props.disabled}
		>
			{!props.loading ? (
				props.text
			) : (
				<Loader className={styles.actionButton__loader} />
			)}
		</button>
	)
}
