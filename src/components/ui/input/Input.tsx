import { useEffect, useId, useState } from 'react'
import styles from './styles.module.scss'

type InputProps = {
	label: string
	value?: string | number
	onChange?: (value: string) => void
	id?: string
	required?: boolean
	error?: boolean
	errorText?: string
	disabled?: boolean
	maxLength?: number
}

export default function Input(props: InputProps): React.JSX.Element {
	const generatedId = useId()

	const [value, setValue] = useState<string>(props.value?.toString() ?? '')

	useEffect(() => {
		if (undefined !== props.value) setValue(props.value.toString())
	}, [props.value])

	const id = props.id ?? generatedId

	return (
		<div className={styles.container}>
			<div className={styles.container__input}>
				<input
					id={props.id ?? id}
					placeholder=' '
					required={props.required}
					className={props.error ? styles.container__input_error : ''}
					disabled={props.disabled}
					value={value}
					onChange={e => {
						const newValue = e.target.value
						setValue(newValue)
						props.onChange?.(newValue)
					}}
					maxLength={props.maxLength}
				/>
				<label htmlFor={id}>
					{props.label}{' '}
					{props.required && <span className={styles.input__required}>*</span>}
				</label>
			</div>
			{props.error && props.errorText && (
				<p className={styles.container__error}>{props.errorText}</p>
			)}
		</div>
	)
}
