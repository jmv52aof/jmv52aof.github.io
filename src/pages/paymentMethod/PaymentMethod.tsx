import React from 'react'
import styles from './styles.module.scss'
import ActionButton from '@components/ui/actionButton/ActionButton'
import PaymentMethod from '@features/paymentMethod/PaymentMethod'
import { useNavigate } from 'react-router'
import PageLayout from '@layouts/pageLayout/PageLayout'

export default function PaymentMethodPage(): React.JSX.Element {
	const nav = useNavigate()
	// Временная заглушка
	const paymentMethod = 'СБП Т-Банк'

	return (
		<PageLayout onReturn={() => nav('/')} title='Способ оплаты'>
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
