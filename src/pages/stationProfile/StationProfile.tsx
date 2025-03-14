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
import { useStationLoader, useStationProfileQueryParser } from './lib/hooks'
import { StationProfilePreviousPageQueries } from '@common/consts/pages'
import { useNavigate } from 'react-router'
import { STATIONS_LIST_ENDPOINT } from '@common/consts/endpoints'
import { Loader } from '@components/ui/loader/Loader'
import NotFoundPage from '@pages/notFound/NotFound'

export default function StationProfilePage(): React.JSX.Element {
	const nav = useNavigate()

	const { pageQueries } = useStationProfileQueryParser()
	const { loading, station } = useStationLoader()

	const [isExpandedDescription, setIsExpandedDescription] =
		useState<boolean>(false)

	const descriptionText = station?.description
	const descriptionIsLarge: boolean = useMemo(
		() => (descriptionText ? descriptionText.length > 50 : false),
		[descriptionText]
	)

	if (loading) {
		return <Loader />
	}
	if (!station) {
		return <NotFoundPage />
	}

	const toggleDescription = () => {
		setIsExpandedDescription(!isExpandedDescription)
	}

	const getFormattedStationDescription = () => {
		if (!isExpandedDescription && descriptionIsLarge) {
			return descriptionText?.slice(0, 50) + '...'
		}
		return descriptionText
	}

	const showButton = descriptionIsLarge

	const distanceInKilometers = station.metres_to_station / 1000

	const formattedDistance = distanceInKilometers.toLocaleString('ru-RU', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	})

	const getPreviousPageEndpoint = (): string | undefined => {
		switch (pageQueries.prev_page) {
			case StationProfilePreviousPageQueries.MAIN:
				return '/'
			case StationProfilePreviousPageQueries.STATIONS_LIST:
				return STATIONS_LIST_ENDPOINT
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
				<a className={styles.header__tittle}>{station.name}</a>
			</div>

			{station.images && 0 !== station.images.length && (
				<StationPhotos
					imageSources={station.images}
					stationStatus={station.status}
				/>
			)}

			<div className={styles.page__block}>
				<a className={styles.text_subTitle}>Адрес</a>
				<ContentBlockLayout>
					<div className={styles.block__content}>
						<a className={styles.text}>{station.address}</a>
						<div className={styles.content__distance}>
							<img src={path} alt='path' />
							<p className={styles.text_distance}>{formattedDistance} км</p>
						</div>
					</div>
				</ContentBlockLayout>
			</div>

			{descriptionText && (
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
			)}

			<div className={styles.page__lineSeparator}></div>

			<div className={styles.page__connectors}>
				{station.connectors.map((connector, index) => (
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
					<DailyOccupation data={station.occupation} />
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
