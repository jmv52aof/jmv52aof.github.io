import styles from './styles.module.scss'
import { useNavigate } from 'react-router'
import ActionButton from '@components/ui/actionButton/ActionButton'
import { useRfidCardLoader } from './lib/hooks'
import { useContext } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import PageLayout from '@layouts/pageLayout/PageLayout'
import RfidCard from '@features/rfidCard/RfidCard'
import { ADD_RFID_CARD_ENDPOINT } from '@common/consts/endpoints'

export default function RfidCardPage(): React.JSX.Element {
	const nav = useNavigate()
	const { rfidCard } = useContext(RootStateContext)
	const { loading } = useRfidCardLoader()

	const onClickHandler = () => {
		if (!rfidCard) {
			nav(ADD_RFID_CARD_ENDPOINT)
		}
	}

	return (
		<PageLayout
			onReturn={() => nav('/')}
			title='Зарядная карта'
			loading={loading}
		>
			<div
				className={
					rfidCard
						? styles.page__content_withCard
						: styles.page__content_withoutCard
				}
			>
				<RfidCard />
			</div>
			<ActionButton
				text={rfidCard ? 'Удалить карту' : 'Привязать карту'}
				variant={rfidCard ? 'red' : 'green'}
				onClick={onClickHandler}
			/>
		</PageLayout>
	)
}
