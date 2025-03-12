import { StationDto } from '@common/types/stations'
import img1 from '@assets/images/station/1.png'
import img2 from '@assets/images/station/1.png'
import path from '@assets/images/path.svg'
import StationPhotos from '@features/stationPhotos/StationPhotos'
import Button from '@components/ui/button/Button.tsx'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import Connector from '@features/stationProfile/components/Connector'
import DailyOccupation from '@components/dailyOccupation/DailyOccupation'
import CollapseButton from '@components/ui/collapseButton/CollapseButton'
import styles from './styles.module.scss'
import commonStyles from '../../../src/common/styles.module.scss'
import React from 'react'
import { useState, useMemo } from 'react'
import arrowImage from '@assets/images/arrow-left.svg'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import { useStationProfileQueryParser } from './lib/hooks'
import { StationProfilePreviousPageQueries } from '@common/consts/pages'
import { useNavigate } from 'react-router'

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

export default function StationProfilePage(props: Props): React.JSX.Element {
	const nav = useNavigate()

	const { pageQueries } = useStationProfileQueryParser()

	const [isExpandedDescription, setIsExpandedDescription] =
		useState<boolean>(false)

	const descriptionText = stationsData.description ?? ''

	const descriptionIsLarge: boolean = useMemo(
		() => descriptionText.length > 50,
		[descriptionText]
	)
	const toggleDescription = () => {
		setIsExpandedDescription(!isExpandedDescription)
	}

	const getFormattedStationDescription = () => {
		if (!isExpandedDescription && descriptionIsLarge) {
			return descriptionText.slice(0, 50) + '...'
		}
		return descriptionText
	}

	const showButton = descriptionIsLarge

	const distanceInKilometers = stationsData.metres_to_station / 1000

	const formattedDistance = distanceInKilometers.toLocaleString('ru-RU', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	})

	const getPreviousPageEndpoint = (): string | undefined => {
		switch (pageQueries.prev_page) {
			case StationProfilePreviousPageQueries.MAIN:
				return '/'
			case StationProfilePreviousPageQueries.STATIONS_LIST:
				return SESSIONS_HISTORY_ENDPOINT
		}
	}

	return (
		<div className={`${commonStyles.page} ${styles.page}`}>
			<div className={styles.page__header}>
				<div className={styles.header__button}>
					<ReturnButton
						onClick={() => {
							const endpoint = getPreviousPageEndpoint()
							if (endpoint) nav(endpoint)
						}}
						iconSrc={arrowImage}
					/>
				</div>
				<a className={styles.header__tittle}>{stationsData.name}</a>
			</div>

			<StationPhotos
				imageSources={stationsData.images}
				stationStatus={stationsData.status}
			/>

			<div className={styles.page__block}>
				<a className={styles.text_subTitle}>Адрес</a>
				<ContentBlockLayout>
					<div className={styles.block__content}>
						<a className={styles.text}>{stationsData.address}</a>
						<div className={styles.content__distance}>
							<img src={path} alt='path' />
							<p className={styles.text_distance}>{formattedDistance} км</p>
						</div>
					</div>
				</ContentBlockLayout>
			</div>

			<div className={styles.page__block}>
				<a className={styles.text_subTitle}>Описание</a>
				<ContentBlockLayout>
					<div>
						<a
							className={`${styles.text} ${
								isExpandedDescription
									? styles.text_expanded
									: styles.text_collapsed
							}`}
						>
							{getFormattedStationDescription()}
						</a>
					</div>
					{showButton && (
						<div className={styles.description__footer}>
							<CollapseButton
								onClick={toggleDescription}
								isOpen={isExpandedDescription}
							/>
						</div>
					)}
				</ContentBlockLayout>
			</div>

			<div className={styles.page__lineSeparator}></div>

			<div className={styles.page__connectors}>
				{stationsData.connectors.map((connector, index) => (
					<Connector
						key={index}
						info={connector}
						className={styles.connectorItem}
					/>
				))}
			</div>

			<div className={styles.page__lineSeparator}></div>

			<div className={styles.page__block}>
				<p className={styles.text_subTitle}>График загруженности</p>
				<ContentBlockLayout>
					<DailyOccupation data={stationsData.occupation} />
				</ContentBlockLayout>
			</div>
			<div className={styles.page__support}>
				<p className={styles.title}>
					Возникли проблемы со станцией? Свяжитесь с нами!
				</p>
				<Button variant='fill' text='Техподдержка' />
			</div>
		</div>
	)
}
