import { ColorTemplate } from '@common/types/status'
import styles from '../styles/marker.module.scss'
import StationMarker from '@components/ui/stationMarker/StationMarker'

type Props = {
	color: ColorTemplate
}

export default function StationMarkerOnMap(props: Props): React.JSX.Element {
	return (
		<div className={`${styles.marker} ${styles[props.color]}`}>
			<StationMarker color={props.color} />
		</div>
	)
}
