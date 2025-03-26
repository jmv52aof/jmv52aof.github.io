import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'
import FiltersButton from '@components/ui/filtersButton/FiltersButton'
import tuningImage from '@assets/images/tuning.svg'
import {
	STATIONS_FILTERS_ENDPOINT,
	STATIONS_LIST_ENDPOINT,
} from '@common/consts/endpoints'
import { createQueryString } from '@common/functions/strings'
import {
	StationsFiltersPageQueryArguments,
	StationsFiltersPreviousPageQueries,
	StationsListPageQueryArguments,
} from '@common/consts/pages'
import { useNavigate } from 'react-router'
import ActiveSessionNotify from '@components/activeSessionNotify/ActiveSessionNotify'
import Search from '@components/ui/search/Search'
import { useStationsLoader } from './lib/hooks'
import { useContext, useEffect, useState } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import Button from '@components/ui/button/Button'
import mapArrowImage from '@assets/images/map-arrow.svg'

/**
 * Главная страница с картой станций
 */
export default function MainPage(): React.JSX.Element {
	const nav = useNavigate()
	const { position, setPosition, stationFilters, setMapViewState } =
		useContext(RootStateContext)
	const { stationsLoading } = useStationsLoader()

	const [updatePositionOnMap, setUpdatePositionOnMap] = useState<boolean>(false)

	useEffect(() => {
		// @ts-ignore
		window.Telegram.WebApp.BackButton.hide()
	})

	useEffect(() => {
		if (position !== undefined) return
		const geo = navigator.geolocation
		if (!geo) {
			return
		}

		const watcher = geo.watchPosition(
			pos => {
				const { latitude, longitude } = pos.coords
				setPosition({ latitude: latitude, longitude: longitude })
			},
			() => {
				setPosition(null)
			}
		)
		return () => geo.clearWatch(watcher)
	}, [])

	const onFiltersClick = () => {
		nav(
			STATIONS_FILTERS_ENDPOINT +
				createQueryString([
					{
						key: StationsFiltersPageQueryArguments.PREVIOUS_PAGE,
						value: StationsFiltersPreviousPageQueries.MAIN,
					},
				])
		)
	}

	const onSearchClick = () => {
		nav(
			STATIONS_LIST_ENDPOINT +
				createQueryString([
					{ key: StationsListPageQueryArguments.SEARCH_FOCUSED, value: 'true' },
				])
		)
	}

	return (
		<div>
			{!stationsLoading && (
				<div className={styles.header}>
					<Search
						placeholder='Поиск'
						variant='shadow'
						onClick={onSearchClick}
						value={stationFilters.partOfName}
					/>
					<FiltersButton
						onClick={onFiltersClick}
						variant='outlined'
						iconSrc={tuningImage}
					/>
					<div className={styles.header__activeSession}>
						<ActiveSessionNotify />
					</div>
				</div>
			)}
			{position && (
				<div className={styles.positionButton}>
					<Button
						onClick={() => {
							setMapViewState({
								zoom: 17,
								latitude: position.latitude,
								longitude: position.longitude,
							})
							setUpdatePositionOnMap(true)
						}}
						variant='iconSmall'
						iconSrc={mapArrowImage}
					/>
				</div>
			)}
			<StationsMap
				loading={stationsLoading}
				allowUpdateViewState={() => {
					if (updatePositionOnMap) {
						setUpdatePositionOnMap(false)
						return true
					}
					return false
				}}
			/>
			<div className={styles.footer}>
				<ControlPanel />
			</div>
		</div>
	)
}
