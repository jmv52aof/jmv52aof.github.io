import arrowUp from '@assets/images/arrow-up.svg'
import arrowDown from '@assets/images/arrow-down.svg'
import styles from './styles.module.scss'
type Props = {
	onClick: (isOpen: boolean) => void
	isOpen: boolean
}

export default function CollapseButton(props: Props): React.JSX.Element {
	return (
		<button
			className={`${styles.expandButton} ${styles.expandButton_text}`}
			onClick={() => props.onClick(props.isOpen)}
		>
			{props.isOpen ? 'Свернуть' : 'Развернуть'}
			<img src={props.isOpen ? arrowUp : arrowDown} alt='arrow' />
		</button>
	)
}
