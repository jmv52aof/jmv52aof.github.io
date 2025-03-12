import styles from '../styles/popUp.module.scss'
import { useState } from 'react'
import leftImage from '@assets/images/left.svg'
import rightImage from '@assets/images/right.svg'
import Button from '@components/ui/button/Button.tsx'
import { StationDto } from '@common/types/stations.ts'
import StationCard from '@components/stationCard/StationCard'

type Props = {
	station: StationDto
	otherStations?: StationDto[]
}

export default function StationPopUp(
	props: Readonly<Props>
): React.JSX.Element {
	const [currStationIndex, setCurrStationIndex] = useState<number>(0)

	const otherStationsExists = (props.otherStations?.length ?? 0) > 0

	const station = otherStationsExists
		? [props.station].concat(...(props.otherStations ?? []))[currStationIndex]
		: props.station

	return (
		<div className={styles.block}>
			<div className={styles.block__header}>
				<div className={styles.header__button}>
					{otherStationsExists && 0 !== currStationIndex && (
						<Button
							iconSrc={leftImage}
							onClick={() => setCurrStationIndex(currStationIndex - 1)}
							variant='iconSmall'
						/>
					)}
				</div>
				{otherStationsExists ? (
					<div className={styles.header__text}>
						Станция №{currStationIndex + 1}
					</div>
				) : (
					<></>
				)}
				<div className={styles.header__button}>
					{otherStationsExists &&
						props.otherStations?.length !== currStationIndex && (
							<Button
								iconSrc={rightImage}
								onClick={() => setCurrStationIndex(currStationIndex + 1)}
								variant='iconSmall'
							/>
						)}
				</div>
			</div>
			<div className={styles.block__content}>
				<StationCard onClick={() => {}} station={station} />
			</div>
		</div>
	)
}
