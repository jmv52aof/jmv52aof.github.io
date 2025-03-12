import styles from './styles.module.scss'

type Props = {
	onClick: () => void
	iconSrc: string
}

export default function ControlButton(
	props: Readonly<Props>
): React.JSX.Element {
	return (
		<button className={styles.button} onClick={props.onClick}>
			<img className={styles.button__icon} src={props.iconSrc} alt='Control' />
		</button>
	)
}
