import styles from '../../styles/profileButton.module.scss'
import { Variant } from './lib/types'
import profileImage from '@assets/images/profile.svg'
import arrowRightImage from '@assets/images/arrow-right.svg'

type Props = {
	onClick: () => void
	variant: Variant
	disabled?: boolean
}

export default function ProfileButton(props: Props): React.JSX.Element {
	const onClickHandler = () => {
		if (!props.disabled) props.onClick()
	}

	const iconSrc = props.variant === 'arrow' ? arrowRightImage : profileImage

	return (
		<button
			onClick={onClickHandler}
			disabled={props.disabled}
			className={`${styles.button}  ${
				props.disabled ? styles.disabled : ''
			}`}
		>
			<img
				src={iconSrc}
				alt='Icon'
				className={styles[`${props.variant}`]}
			/>
		</button>
	)
}
