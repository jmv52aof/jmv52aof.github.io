import { StationDto } from '@common/types/stations'
import img1 from '@assets/images/station/1.png'
import img2 from '@assets/images/station/1.png'
import arrow from '@assets/images/arrow-left.svg'
import path from '@assets/images/path.svg'
import StationPhotos from '@features/stationPhotos/StationPhotos'
import Button from '@components/ui/button/Button.tsx'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import Connector from '@features/stationProfile/components/Connector'
import DailyOccupation from '@components/dailyOccupation/DailyOccupation'
import arrowUp from '@assets/images/arrow-up.svg'
import arrowDown from '@assets/images/arrow-down.svg'
import styles from './styles.module.scss'
import React from 'react'
import { useState } from 'react'

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
			standard: 'CHAdeMO',
			format: 'Кабель',
			power_type: 'AC',
			max_voltage: 220,
			max_amperage: 5,
			max_electric_power: 20,
			tariffs: [
				{
					type: 'Энергия',
					price: 2000,
					currency: 'руб',
				},
			],
		},
		{
			evse_uid: '2',
			id: '3',
			status: 'Занят',
			standard: 'CHAdeMO',
			format: 'Кабель',
			power_type: 'DC',
			max_voltage: 220,
			max_amperage: 5,
			max_electric_power: 20,
			tariffs: [
				{
					type: 'Энергия',
					price: 2000,
					currency: 'руб',
				},
				{
					type: 'Энергия',
					price: 150,
					currency: 'руб',
				},
			],
		},
		{
			evse_uid: '2',
			id: '3',
			status: 'Занят',
			standard: 'CHAdeMO',
			format: 'Кабель',
			power_type: 'AC-2',
			max_voltage: 220,
			max_amperage: 5,
			max_electric_power: 20,
			tariffs: [
				{
					type: 'Энергия',
					price: 2000,
					currency: 'руб',
				},
			],
		},
	],
	images: [img1, img2],
	metres_to_station: 1488,
	rating: 5,
	occupation: [
		{
			weekday: 1,
			occupancy_in_percentage: 90,
		},
		{
			weekday: 2,
			occupancy_in_percentage: 70,
		},
		{
			weekday: 3,
			occupancy_in_percentage: 70,
		},
		{
			weekday: 4,
			occupancy_in_percentage: 60,
		},
		{
			weekday: 5,
			occupancy_in_percentage: 80,
		},
		{
			weekday: 6,
			occupancy_in_percentage: 20,
		},
		{
			weekday: 7,
			occupancy_in_percentage: 10,
		},
	],
}

/**
 * Layout списка
 */
export default function StationProfile(props: Props): React.JSX.Element {
	const [isExpandedDescription, setIsExpandedDescription] = useState(false)
	const descriptionText = stationsData.description || ''

	const toggleDescription = () => {
		setIsExpandedDescription(!isExpandedDescription)
	}

	const textToShow = () => {
		if (!isExpandedDescription && descriptionText.length > 50) {
			return descriptionText.slice(0, 50) + '...'
		}
		return descriptionText
	}

	const showButton = descriptionText.length > 50

	const distanceInKilometers = stationsData.metres_to_station / 1000

	const formattedDistance = distanceInKilometers.toLocaleString('ru-RU', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	})

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

			<div className={styles.stationProfile__address}>
				<p className={styles.text_subTitle}>Адрес</p>
				<ContentBlockLayout>
					<div className={styles.addressBox__description}>
						<p
							className={`${styles.text} ${styles.addressBox__description_text}`}
						>
							{stationsData.address}
						</p>
						<div className={styles.addressBox__distanceBox}>
							<img src={path} alt='path' />
							<p className={styles.text_distance}>{formattedDistance} км</p>
						</div>
					</div>
				</ContentBlockLayout>
			</div>

			<div className={styles.stationProfile__description}>
				<ContentBlockLayout>
					<div>
						<p className={styles.text_subTitle}>Описание</p>
						<p
							className={`${styles.text} ${
								isExpandedDescription ? styles.expanded : styles.collapsed
							}`}
						>
							{textToShow()}
						</p>
					</div>
					{showButton && (
						<div className={styles.description__footer}>
							<button
								className={`${styles.expandButton} ${styles.expandButton_text}`}
								onClick={toggleDescription}
							>
								{isExpandedDescription ? 'Свернуть' : 'Развернуть'}
								<img
									src={isExpandedDescription ? arrowUp : arrowDown}
									alt='arrow'
								/>
							</button>
						</div>
					)}
				</ContentBlockLayout>
			</div>

			<div className={styles.line_separator}></div>

			<div className={styles.stationProfile__connectors}>
				{stationsData.connectors.map((connector, index) => (
					<Connector
						key={index}
						info={connector}
						className={styles.connectorItem}
					/>
				))}
			</div>
			<div className={styles.line_separator}></div>

			<div className={styles.stationProfile__dailyOccupation}>
				<p className={styles.text_subTitle}>График загруженности</p>
				<ContentBlockLayout>
					<DailyOccupation data={stationsData.occupation}></DailyOccupation>
				</ContentBlockLayout>
			</div>
			<div className={styles.stationProfile__support}>
				<p className={styles.text_title}>
					Возникли проблемы со станцией? Свяжитесь с нами!
				</p>
				<Button variant='fill' text='Техподдержка'></Button>
			</div>
		</div>
	)
}
