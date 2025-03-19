import { RFID_CARD_ENDPOINT } from '@common/consts/endpoints'
import PageLayout from '@layouts/pageLayout/PageLayout'
import { useNavigate } from 'react-router'
import styles from './styles.module.scss'
import ActionButton from '@components/ui/actionButton/ActionButton'
import AddRfidCardForm from '@features/addRfidCardForm/AddRfidCard'
import { RfidCardFormContext } from 'contexts/RfidCardFormContext'
import { useContext, useState } from 'react'
import { RfidCardForm } from '@common/types/rfidCards'
import { DEFAULT_RFID_CARD_FORM } from '@common/consts/rfidCards'
import { useRfidCardAddHandler } from './lib/hooks'
import { RootStateContext } from '@contexts/RootStateContext'

export default function AddRfidCardPage(): React.JSX.Element {
	const nav = useNavigate()

	const { showSnackbar } = useContext(RootStateContext)
	const { addRfidCard, loading } = useRfidCardAddHandler()

	const [form, setForm] = useState<RfidCardForm>(DEFAULT_RFID_CARD_FORM)
	const [error, setError] = useState<string | undefined>()

	const formIsFilled = !!form.visualNumber.length

	const onClickHandler = async (): Promise<void> => {
		const result = await addRfidCard(form)
		if (!result) {
			nav(RFID_CARD_ENDPOINT)
			showSnackbar('success', 'Зарядная карта добавлена')
		} else setError(result)
	}

	return (
		<PageLayout
			onReturn={() => nav(RFID_CARD_ENDPOINT)}
			title='Добавление зарядной карты'
			className={styles.page}
		>
			<div className={styles.page__content}>
				<RfidCardFormContext.Provider
					value={{
						form: form,
						setForm: form => {
							setForm(form)
							setError(undefined)
						},
						error: error,
					}}
				>
					<AddRfidCardForm />
				</RfidCardFormContext.Provider>
			</div>
			<ActionButton
				text='Привязать карту'
				variant='green'
				onClick={onClickHandler}
				disabled={!formIsFilled || !!error}
				loading={loading}
			/>
		</PageLayout>
	)
}
