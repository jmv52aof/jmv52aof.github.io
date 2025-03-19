import styles from './styles.module.scss'
import { useNavigate } from 'react-router'
import ActionButton from '@components/ui/actionButton/ActionButton'
import { useRfidCardLoader } from './lib/hooks'
import { useContext, useState } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import PageLayout from '@layouts/pageLayout/PageLayout'
import RfidCard from '@features/rfidCard/RfidCard'
import { ADD_RFID_CARD_ENDPOINT } from '@common/consts/endpoints'
import PopupWrapper from '@features/popupWrapper/PopupWrapper'
import ConfirmationPopupContent from '@components/confirmationPopupContent/ConfirmationPopupContent'
import { useApi } from '@common/hooks/api'

export default function RfidCardPage(): React.JSX.Element {
	const nav = useNavigate()

	const { detachRfidCardFromApi } = useApi()
	const { rfidCard, setRfidCard, showSnackbar } = useContext(RootStateContext)
	const { loading } = useRfidCardLoader()

	const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)

	const onClickHandler = () => {
		if (!rfidCard) nav(ADD_RFID_CARD_ENDPOINT)
		else setPopupIsOpen(true)
	}

	return (
		<PageLayout
			onReturn={() => nav('/')}
			title='Зарядная карта'
			loading={loading}
		>
			<PopupWrapper isOpen={popupIsOpen} onClose={() => setPopupIsOpen(false)}>
				<ConfirmationPopupContent
					title={
						<>
							Вы действительно хотите <br /> удалить карту?
						</>
					}
					errorTitle={
						<>
							Не удалось удалить <br /> зарядную карту
						</>
					}
					description='После удаления вы не сможете заряжаться по данной карте'
					onConfirm={() =>
						detachRfidCardFromApi({
							visualCardNumber: rfidCard?.visual_number ?? '',
						})
					}
					onSuccess={() => {
						showSnackbar('warning', 'Зарядная карта удалена')
						setRfidCard(undefined)
					}}
					onClose={() => setPopupIsOpen(false)}
				/>
			</PopupWrapper>

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
