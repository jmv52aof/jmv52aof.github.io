import searchImage from '@assets/images/search.svg'
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from 'react'

type SearchProps = {
	variant: 'outlined' | 'shadow'
	placeholder?: string
	value?: string | number
	onChange?: (value: string) => void
	onClick?: () => void
	disabled?: boolean
	maxLength?: number
	focus?: boolean
}

export default function Search(props: SearchProps): React.JSX.Element {
	const [value, setValue] = useState<string>(props.value?.toString() ?? '')
	const input = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (undefined !== props.value) setValue(props.value.toString())
	}, [props.value])

	useEffect(() => {
		if (props.focus && input.current) {
			input.current.focus()
		}
	}, [props.focus, input])

	return (
		<div className={styles.search} onClick={props.onClick}>
			<img className={styles.search__icon} src={searchImage} alt='Search' />
			<input
				ref={input}
				placeholder={props.placeholder}
				className={`${styles.search__input} ${
					styles['search__input_' + props.variant]
				} ${props.disabled ? styles.search__input_disabled : ''}`}
				disabled={props.disabled}
				value={value}
				onChange={e => {
					const newValue = e.target.value
					setValue(newValue)
					props.onChange?.(newValue)
				}}
				maxLength={props.maxLength}
			/>
		</div>
	)
}
