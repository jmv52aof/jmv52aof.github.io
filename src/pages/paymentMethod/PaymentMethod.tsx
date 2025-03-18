import React, { useContext } from 'react'
import styles from './styles.module.scss'
import ActionButton from '@components/ui/actionButton/ActionButton'
import PaymentMethod from '@features/paymentMethod/PaymentMethod'
import { useNavigate } from 'react-router'
import PageLayout from '@layouts/pageLayout/PageLayout'
import { usePaymentMethodLoader } from './lib/hooks'
import { RootStateContext } from '@contexts/RootStateContext'

export default function PaymentMethodPage(): React.JSX.Element {
	const nav = useNavigate()
	const { loading } = usePaymentMethodLoader()
	const { paymentMethod } = useContext(RootStateContext)

	return (
		<PageLayout
			onReturn={() => nav('/')}
			title='Способ оплаты'
			loading={loading}
		>
			<div className={styles.page__main}>
				<PaymentMethod paymentMethod={paymentMethod} />
			</div>
			<ActionButton
				text={
					paymentMethod ? 'Удалить способ оплаты' : 'Привязать способ оплаты'
				}
				variant={paymentMethod ? 'red' : 'green'}
				onClick={() => {
					console.log(
						paymentMethod ? 'Удалить способ оплаты' : 'Привязать способ оплаты'
					)
				}}
			/>
		</PageLayout>
	)
}
