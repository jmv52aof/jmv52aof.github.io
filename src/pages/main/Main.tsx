import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'
import { useContext, useEffect, useState } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import { useApi } from '@common/hooks/api'
import { createGetStationsRequestOptions } from '@common/functions/stations'
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

/**
 * Главная страница с картой станций
 */
export default function MainPage(): React.JSX.Element {
	const nav = useNavigate()

	const { setStations, stationFilters } = useContext(RootStateContext)
	const { getStationsFromApi } = useApi()

	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!stationFilters.shouldUpdateStations) {
			setLoading(false)
			return
		}

		getStationsFromApi(createGetStationsRequestOptions(stationFilters))
			.then(res => {
				setStations(res)
			})
			.finally(() => setLoading(false))
	}, [stationFilters])

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
			{!loading && (
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
			<StationsMap loading={loading} />
			{!loading && (
				<div className={styles.footer}>
					<ControlPanel />
				</div>
			)}
		</div>
	)
}
