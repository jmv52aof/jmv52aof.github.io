import styles from './styles.module.scss'
import { STATION_STATUS_COLORS } from '@common/consts/stations'
import electricRefuelingImage from '@assets/images/electric-refueling.svg'
import { StationStatus } from '@common/types/stations'

type Props = {
	status: StationStatus
}

export default function StationMarker(props: Readonly<Props>) {
	return (
		<div
			className={`${styles.marker} ${
				styles[`marker_${STATION_STATUS_COLORS[props.status]}`]
			}`}
		>
			<img src={electricRefuelingImage} alt='Station marker' />
		</div>
	)
}
