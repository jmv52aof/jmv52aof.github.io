import styles from './styles.module.scss'
import { STATION_STATUS_COLORS } from '@common/consts/stations'
import electricRefuelingImage from '@assets/images/electric-refueling.svg'
import { StationStatus } from '@common/types/stations'

type Props = {
    status: StationStatus
}

export default function StationMarker({ status }: Props) {
    return (
        <div className={`${styles.mainInfo__icon} ${styles[`icon_${STATION_STATUS_COLORS[status]}`]}`}>
            <img src={electricRefuelingImage} alt="electric-refueling" />
        </div>
    )
}