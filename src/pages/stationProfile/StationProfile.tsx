import path from '@assets/images/path.svg'
import StationPhotos from '@features/stationPhotos/StationPhotos'
import Button from '@components/ui/button/Button.tsx'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import Connector from '@features/stationProfile/components/Connector'
import DailyOccupation from '@components/dailyOccupation/DailyOccupation'
import CollapseButton from '@components/ui/collapseButton/CollapseButton'
import styles from './styles.module.scss'
import React from 'react'
import { useState, useMemo } from 'react'
import { useStationLoader, useStationProfileQueryParser } from './lib/hooks'
import { StationProfilePreviousPageQueries } from '@common/consts/pages'
import { useNavigate } from 'react-router'
import {
	SESSION_PROFILE_ENDPOINT,
	SESSIONS_HISTORY_ENDPOINT,
	STATIONS_LIST_ENDPOINT,
} from '@common/consts/endpoints'
import { Loader } from '@components/ui/loader/Loader'
import NotFoundPage from '@pages/notFound/NotFound'
import PageLayout from '@layouts/pageLayout/PageLayout'

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
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		)
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

	const getDistance = (): string | undefined => {
		if (!station.metres_to_station) return

		const distanceInKilometers = station.metres_to_station / 1000
		return distanceInKilometers.toLocaleString('ru-RU', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		})
	}

	const getPreviousPageEndpoint = (): string => {
		switch (pageQueries.prev_page) {
			case StationProfilePreviousPageQueries.STATIONS_LIST:
				return STATIONS_LIST_ENDPOINT
			case StationProfilePreviousPageQueries.ACTIVE_SESSION:
				return (
					SESSION_PROFILE_ENDPOINT +
					(pageQueries.from_charging_session_id ?? '')
				)
			case StationProfilePreviousPageQueries.SESSIONS_LIST:
				return SESSIONS_HISTORY_ENDPOINT
		}
		return '/'
	}

	return (
		<PageLayout
			onReturn={() => nav(getPreviousPageEndpoint())}
			title={station.name}
			className={styles.page}
		>
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
						{getDistance() && (
							<div className={styles.content__distance}>
								<img src={path} alt='path' />
								<a className={styles.text_distance}>{getDistance()} км</a>
							</div>
						)}
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
					<Connector key={index} info={connector} />
				))}
			</div>

			<div className={styles.page__lineSeparator}></div>

			<div className={styles.page__block}>
				<a className={styles.text_subTitle}>График загруженности</a>
				<ContentBlockLayout>
					<DailyOccupation data={station.occupation} />
				</ContentBlockLayout>
			</div>
			<div className={styles.page__support}>
				<a className={styles.title}>
					Возникли проблемы со станцией? <br />
					Свяжитесь с нами!
				</a>
				<Button
					variant='fill'
					text='Техподдержка'
					onClick={() =>
						window.location.replace(import.meta.env.VITE_TELEGRAM_SUPPORT_URL)
					}
				/>
			</div>
		</PageLayout>
	)
}
