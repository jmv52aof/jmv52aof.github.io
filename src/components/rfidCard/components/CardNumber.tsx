import styles from '../styles/number.module.scss'
import eyeImage from '@assets/images/eye.svg'
import eyeClosedImage from '@assets/images/eye-closed.svg'
import Button from '@components/ui/button/Button'
import { useState } from 'react'
import { maskCardNumber } from '@common/functions/rfidCards'

type Props = {
	number: string
}

export default function CardNumber(props: Readonly<Props>): React.JSX.Element {
	const [hidden, setHidden] = useState<boolean>(true)

	return (
		<div className={styles.number}>
			<a className={styles.number__text}>
				{hidden ? maskCardNumber(props.number) : props.number}
			</a>
			<Button
				variant='text'
				iconSrc={hidden ? eyeImage : eyeClosedImage}
				onClick={() => setHidden(!hidden)}
				text={hidden ? 'Посмотреть' : 'Скрыть'}
			/>
		</div>
	)
}
