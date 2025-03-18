import Input from '@components/ui/input/Input'
import styles from './styles.module.scss'
import { useContext } from 'react'
import { RfidCardFormContext } from 'contexts/RfidCardFormContext'

export default function AddRfidCardForm(): React.JSX.Element {
	const { form, setForm, error } = useContext(RfidCardFormContext)

	return (
		<div className={styles.form}>
			<a className={styles.form__description}>
				Введите визуальный номер с одной из сторон вашей физической карты:
			</a>
			<Input
				label='Номер карты'
				required
				value={form.visualNumber}
				onChange={v => setForm({ ...form, visualNumber: v })}
				error={!!error}
				errorText={error}
			/>
		</div>
	)
}
