import searchImage from '@assets/images/search.svg'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'

type SearchProps = {
	placeholder?: string
	value?: string | number
	onChange?: (value: string) => void
	disabled?: boolean
	maxLength?: number
	variant: 'outlined' | 'shadow'
}

export default function Search(props: SearchProps): React.JSX.Element {
	const [value, setValue] = useState<string>(props.value?.toString() ?? '')

	useEffect(() => {
		if (undefined !== props.value) setValue(props.value.toString())
	}, [props.value])

	return (
		<div className={styles.search}>
			<img
				className={`${styles.search__icon} ${
					props.disabled ? styles.search__icon_disabled : ''
				}`}
				src={searchImage}
				alt='Search'
			/>
			<input
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
