import styles from './styles.module.scss'

type Props = {
	iconSrc: string
	text: string
}

export default function EmptyDataNotification(
	props: Readonly<Props>
): React.JSX.Element {
	return (
		<div className={styles.block}>
			<img className={styles.block__icon} src={props.iconSrc} alt='Icon' />
			<a className={styles.block__text}>{props.text}</a>
		</div>
	)
}
