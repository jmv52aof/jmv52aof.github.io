import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'
import FiltersButton from '@components/ui/filtersButton/FiltersButton'
import tuningImage from '@assets/images/tuning.svg'
import { STATIONS_FILTERS_ENDPOINT } from '@common/consts/endpoints'
import { createQueryString } from '@common/functions/strings'
import {
	StationsFiltersPageQueryArguments,
	StationsFiltersPreviousPageQueries,
} from '@common/consts/pages'
import { useNavigate } from 'react-router'
import ActiveSessionNotify from '@components/activeSessionNotify/ActiveSessionNotify'
import Search from '@components/ui/search/Search'
import { useStationsLoader } from './lib/hooks'
import { useContext, useEffect } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'

/**
 * Главная страница с картой станций
 */
export default function MainPage(): React.JSX.Element {
	const nav = useNavigate()
	const { position, setPosition } = useContext(RootStateContext)
	const { stationsLoading } = useStationsLoader()

	useEffect(() => {
		const geo = navigator.geolocation

		if (position !== undefined || !geo) return

		const watcher = geo.watchPosition(
			position => {
				setPosition({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				})
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

	return (
		<div>
			{!stationsLoading && (
				<div className={styles.header}>
					<Search placeholder='Поиск' variant='shadow' disabled />
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
			<StationsMap loading={stationsLoading} />
			{!stationsLoading && (
				<div className={styles.footer}>
					<ControlPanel />
				</div>
			)}
		</div>
	)
}
