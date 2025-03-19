import styles from './styles.module.scss'
import electricRefuelingImage from '@assets/images/electric-refueling.svg'
import { ColorTemplate } from '@common/types/status'

type Props = {
	color: ColorTemplate
}

export default function StationMarker(props: Readonly<Props>) {
	return (
		<div className={`${styles.marker} ${styles[`marker_${props.color}`]}`}>
			<img src={electricRefuelingImage} alt='Station marker' />
		</div>
	)
}
