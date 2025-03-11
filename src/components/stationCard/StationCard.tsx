import styles from './styles/card.module.scss'
import pathImage from '@assets/images/path.svg'
import { StationDto } from '@common/types/stations'
import Connector from './components/connector/Connector'
import StationMarker from '@components/ui/stationMarker/StationMarker'

type Props = {
	onClick: () => void
	station: StationDto
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

	return (
		<div className={styles.stationCard} onClick={handleClick}>
			<div className={styles.stationCard__header}>
				<div className={styles.header__mainInfo}>
					<StationMarker status={props.station.status} />
					<div className={styles.mainInfo__texts}>
						<p className={styles.texts__name}>{props.station.name}</p>
						<p className={styles.texts__description}>{props.station.address}</p>
					</div>
				</div>
				<div className={styles.content__path}>
					<div className={styles.path__icon}>
						<img src={pathImage} alt='path' />
					</div>
					{undefined !== props.station.metres_to_station && (
						<p className={styles.path__text}>
							{props.station.metres_to_station} км
						</p>
					)}
				</div>
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
