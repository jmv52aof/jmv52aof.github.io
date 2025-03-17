import React from 'react'
import styles from './styles.module.scss'
import ActionButton from '@components/ui/actionButton/ActionButton'
import commonStyles from '@common/styles.module.scss'
import PaymentMethod from '@features/paymentMethod/PaymentMethod'
import { useNavigate } from 'react-router'
import PageHeader from '@features/header/Header'

export default function PaymentMethodPage(): React.JSX.Element {
	const nav = useNavigate()
	// Временная заглушка
	const paymentMethod = 'СБП Т-Банк'

	return (
		<div className={commonStyles.page}>
			<div className={styles.page__content}>
				<PageHeader onReturn={() => nav('/')} title='Способ оплаты' />

				<div className={styles.content__main}>
					<PaymentMethod paymentMethod={paymentMethod} />
				</div>

				<div className={styles.content__actionButton}>
					<ActionButton
						text={
							paymentMethod
								? 'Удалить способ оплаты'
								: 'Привязать способ оплаты'
						}
						variant={paymentMethod ? 'red' : 'green'}
						onClick={() => {
							console.log(
								paymentMethod
									? 'Удалить способ оплаты'
									: 'Привязать способ оплаты'
							)
						}}
					/>
				</div>
			</div>
		</div>
	)
}
