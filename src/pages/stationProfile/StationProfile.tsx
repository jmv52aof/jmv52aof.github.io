import { StationDto } from '@common/types/stations'
import img1 from '@assets/images/station/1.png'
import img2 from '@assets/images/station/1.png'
import arrow from '@assets/images/arrow-left.svg'
import path from '@assets/images/path.svg'
import StationPhotos from '@features/stationPhotos/StationPhotos'
import Button from '@components/ui/button/Button.tsx'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import Connector from '@features/stationProfile/components/Connector'
import styles from './styles.module.scss'
import React from 'react'

type Props = {
	stations: StationDto
}

const stationsData: StationDto = {
	id: '1',
	name: 'Отель Кукарский двор',
	address: 'г. Москва, Измайловское шоссе, дом 71, корпус 3В',
	status: 'Доступна',
	description:
		'Зарядка EV от “ElectroDrive”! Мощность станции: 50кВт. Поддерживаются разъемы: CCS2 CHAdeMO Type 2 Расположение: Измайловское шоссе, дом 71, корпус 3В, парковка P2. Мониторинг загруженности онлайн. Круглосуточная работа, техподдержка 24/7. Быстрая и надежная зарядка!',
	coordinates: {
		latitude: '1',
		longitude: '2',
	},
	connectors: [
		{
			evse_uid: '1',
			id: '2',
			status: 'Доступен',
			standart: 'CHAdeMO',
			format: 'Кабель',
			power_type: 'AC',
			max_voltage: 220,
			max_amperage: 5,
			max_electric_power: 1000,
			tariffs: {
				type: 'Энергия',
				price: 2000,
				currency: 'руб',
			},
		},
		{
			evse_uid: '2',
			id: '3',
			status: 'Занят',
			standart: 'CHAdeMO',
			format: 'Кабель',
			power_type: 'AC',
			max_voltage: 220,
			max_amperage: 5,
			max_electric_power: 1000,
			tariffs: {
				type: 'Энергия',
				price: 2000,
				currency: 'руб',
			},
		},
	],
	images: [img1, img2],
	metres_to_station: 1488,
	rating: 5,
	occupation: [5, 70],
}

// StationDto {
//     id: string
//     name: string
//     address: string
//     status: StationStatus
//     description?: string
//     coordinates: GeolocationDto
//     connectors: ConnectorDto[]
//     images?: string[]
//     /** Сколько метров до станции от заданной точки геолокации */
//     metres_to_station?: number
//     /** Рейтинг станции: оценка от 1 до 5 */
//     rating?: number
//     /** Загруженность станции по дням недели */
//     occupation: DailyOccupationDto[]
// }

/**
 * Layout списка
 */
export default function StationProfile(props: Props): React.JSX.Element {
	return (
		<div>
			<div className={styles.stationProfile__header}>
				<Button variant='iconSmall' iconSrc={arrow} />
				<p className={styles.text_title}> {stationsData.name}</p>
			</div>
			<StationPhotos
				imageSources={stationsData.images}
				stationStatus={stationsData.status}
				rating={stationsData.rating}
			/>

			<div className={styles.stationProfile__addressBox}>
				<p className={styles.text__address_title}>Адрес</p>
				<ContentBlockLayout>
					<div className={styles.addressBox__description}>
						<p
							className={`${styles.text} ${styles.addressBox__description_text}`}
						>
							{stationsData.address}
						</p>
						<div className={styles.addressBox__distanceBox}>
							<img src={path} alt='path' />
							<p className={styles.text_distance}>
								{stationsData.metres_to_station}
							</p>
						</div>
					</div>
				</ContentBlockLayout>
			</div>

			<div className={styles.stationProfile__description}>
				<p className={styles.text__description_title}>Описание</p>
				<ContentBlockLayout>
					<p className={styles.text}>{stationsData.description}</p>
				</ContentBlockLayout>
			</div>
			<div className={styles.line_separator}></div>
			<Connector info={stationsData.connectors[1]}></Connector>
		</div>
	)
}
