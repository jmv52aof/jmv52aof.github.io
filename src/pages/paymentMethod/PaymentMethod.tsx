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
import { Loader } from '@components/ui/loader/Loader'

export default function PaymentMethodPage(): React.JSX.Element {
	const nav = useNavigate()

	const { loading } = usePaymentMethodLoader()
	const { paymentMethod, setPaymentMethod, showSnackbar } =
		useContext(RootStateContext)
	const {
		createPaymentMethodFromApi,
		getPaymentUrlFromApi,
		deletePaymentMethodFromApi,
	} = useApi()
	const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const createNewPaymentMethod = async () => {
		setIsLoading(true)
		await createPaymentMethodFromApi({})

		const paymentUrl = await getPaymentUrlFromApi({}).then(res => {
			return res ? JSON.parse(res) : undefined
		})
		if (paymentUrl) {
			window.Telegram.WebApp.openLink(paymentUrl, true)
		} else {
			showSnackbar('error', 'Не удалось создать способ оплаты')
		}
		setIsLoading(false)
	}

	const doDeletePaymentMethod = async () => {
		const deletePaymentMethodResponse = await deletePaymentMethodFromApi({})
		if (deletePaymentMethodResponse && deletePaymentMethodResponse.error) {
			return deletePaymentMethodResponse
		}
	}

	const processClickAction = () => {
		paymentMethod ? setPopupIsOpen(true) : createNewPaymentMethod()
	}

	const onPaymentMethodDeleted = async () => {
		showSnackbar('warning', 'Способ оплаты удалён')
		setPaymentMethod(undefined)
	}

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
					onConfirm={doDeletePaymentMethod}
					onSuccess={onPaymentMethodDeleted}
					onClose={() => setPopupIsOpen(false)}
				/>
			</PopupWrapper>
			<PopupWrapper isOpen={isLoading} onClose={() => {}}>
				<Loader />
			</PopupWrapper>

			<div className={styles.page__main}>
				<PaymentMethod
					paymentMethod={paymentMethod ? paymentMethod : undefined}
				/>
			</div>
			<ActionButton
				text={
					paymentMethod ? 'Удалить способ оплаты' : 'Привязать способ оплаты'
				}
				variant={paymentMethod ? 'red' : 'green'}
				onClick={processClickAction}
				disabled={isLoading}
			/>
		</PageLayout>
	)
}
