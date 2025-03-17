import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import styles from './styles.module.scss'

type Props = {
	onReturn: () => void
	title: string
	content?: React.ReactNode
}

export default function PageHeader(props: Readonly<Props>): React.JSX.Element {
	return (
		<div className={styles.header}>
			<div className={styles.header__left}>
				<ReturnButton onClick={props.onReturn} iconSrc={arrowImage} />
			</div>
			<div className={styles.header__title}>
				<a className={styles.title__text}>{props.title}</a>
			</div>
			<div className={styles.header__right}>{props.content}</div>
		</div>
	)
}
