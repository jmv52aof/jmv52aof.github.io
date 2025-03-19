import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import ActionButton from '@components/ui/actionButton/ActionButton'
import PaymentMethod from '@features/paymentMethod/PaymentMethod'
import { useNavigate } from 'react-router'
import PageLayout from '@layouts/pageLayout/PageLayout'
import { usePaymentMethodLoader } from './lib/hooks'
import { RootStateContext } from '@contexts/RootStateContext'
import PopupWrapper from '@features/popupWrapper/PopupWrapper'
import ConfirmationPopupContent from '@components/confirmationPopupContent/ConfirmationPopupContent'
import { useApi } from '@common/hooks/api'

export default function PaymentMethodPage(): React.JSX.Element {
	const nav = useNavigate()

	const { deletePaymentMethodFromApi } = useApi()
	const { loading } = usePaymentMethodLoader()
	const { paymentMethod, showSnackbar } = useContext(RootStateContext)

	const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)

	return (
		<PageLayout
			onReturn={() => nav('/')}
			title='Способ оплаты'
			loading={loading}
		>
			<PopupWrapper isOpen={popupIsOpen} onClose={() => setPopupIsOpen(false)}>
				<ConfirmationPopupContent
					title={
						<>
							Вы действительно хотите <br /> удалить способ оплаты?
						</>
					}
					errorTitle={
						<>
							Не удалось удалить <br /> способ оплаты
						</>
					}
					onConfirm={() => deletePaymentMethodFromApi({})}
					onSuccess={() => showSnackbar('warning', 'Способ оплаты удалён')}
					onClose={() => setPopupIsOpen(false)}
				/>
			</PopupWrapper>

			<div className={styles.page__main}>
				<PaymentMethod paymentMethod={paymentMethod} />
			</div>
			<ActionButton
				text={
					paymentMethod ? 'Удалить способ оплаты' : 'Привязать способ оплаты'
				}
				variant={paymentMethod ? 'red' : 'green'}
				onClick={() => {
					if (paymentMethod) setPopupIsOpen(true)
				}}
			/>
		</PageLayout>
	)
}
