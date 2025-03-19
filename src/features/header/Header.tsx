import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import styles from './styles.module.scss'
import { useContext } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'

type Props = {
	onReturn: () => void
	title: string
	content?: React.ReactNode
}
/**
 * Заголовок страницы.
 * Примечание: кнопка возвращения появляется только в некоторых случаях
 * 1) Когда приложение запущено в dev режиме
 * 2) Когда приложение запущено в release режиме, но открыто не в телеграмме
 * 3) Когда произошла ошибка при инициализации telegram sdk
 */
export default function PageHeader(props: Readonly<Props>): React.JSX.Element {
	const { isInitTelegramSdk } = useContext(RootStateContext)

	const showReturnButton = !isInitTelegramSdk || import.meta.env.DEV

	return (
		<div className={styles.header}>
			{showReturnButton ? (
				<div className={styles.header__left}>
					<ReturnButton onClick={props.onReturn} iconSrc={arrowImage} />
				</div>
			) : (
				<div></div>
			)}
			<div className={styles.header__title}>
				<a className={styles.title__text}>{props.title}</a>
			</div>
			<div className={styles.header__right}>{props.content}</div>
		</div>
	)
}
