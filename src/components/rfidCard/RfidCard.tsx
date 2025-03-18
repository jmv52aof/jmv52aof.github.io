import { RfidCardDto } from '@common/types/rfidCards'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import wifiImage from '@assets/images/wi-fi.svg'
import styles from './styles/card.module.scss'
import CardNumber from './components/CardNumber'
import RfidCardRow from './components/Row'

type Props = {
	card: RfidCardDto
}

export default function RfidCard(props: Readonly<Props>): React.JSX.Element {
	return (
		<ContentBlockLayout className={styles.card}>
			<div className={styles.card__header}>
				<div className={styles.header__left}>
					<a className={styles.left__text}>RFID</a>
					<img className={styles.left__icon} src={wifiImage} alt='NFC' />
				</div>
				<CardNumber number={props.card.visual_number} />
			</div>
			<div className={styles.card__content}>
				<RfidCardRow name='Тип' value='Персональная' />
				{props.card.group && (
					<RfidCardRow name='Группа' value={props.card.group} />
				)}
			</div>
		</ContentBlockLayout>
	)
}
