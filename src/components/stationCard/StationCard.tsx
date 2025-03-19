import styles from './styles/card.module.scss'
import pathImage from '@assets/images/path.svg'
import { StationDto } from '@common/types/stations'
import Connector from './components/connector/Connector'
import StationMarker from '@components/ui/stationMarker/StationMarker'
import { STATION_STATUS_COLORS } from '@common/consts/stations'

type Props = {
	onClick: () => void
	station: StationDto
	showDistance?: boolean
}

export default function StationCard(props: Readonly<Props>) {
	const handleClick = () => {
		if (props.onClick) {
			props.onClick()
		}
	}

	const connectorsToRender =
		props.station.connectors.length > 0
			? props.station.connectors
			: [props.station.connectors[0]]

	const getDistance = (): string | undefined => {
		if (!props.station.metres_to_station) return

		const distanceInKilometers = props.station.metres_to_station / 1000
		return distanceInKilometers.toLocaleString('ru-RU', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		})
	}

	return (
		<div className={styles.stationCard} onClick={handleClick}>
			<div className={styles.stationCard__header}>
				<div className={styles.header__mainInfo}>
					<StationMarker color={STATION_STATUS_COLORS[props.station.status]} />
					<div className={styles.mainInfo__texts}>
						<p className={styles.texts__name}>{props.station.name}</p>
						<p className={styles.texts__description}>{props.station.address}</p>
					</div>
				</div>
				{getDistance() && props.showDistance && (
					<div className={styles.content__path}>
						<div className={styles.path__icon}>
							<img src={pathImage} alt='path' />
						</div>
						<p className={styles.path__text}>{getDistance()} км</p>
					</div>
				)}
			</div>
			<div className={styles.stationCard__body}>
				<div className={styles.body__connectorsList}>
					<div className={styles.connectorsList}>
						{connectorsToRender.map((connector, index) => (
							<Connector
								key={connector.id}
								connector={connector}
								isLast={index === connectorsToRender.length - 1}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
