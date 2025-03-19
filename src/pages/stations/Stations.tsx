import styles from './styles.module.scss'
import tuningImage from '@assets/images/tuning.svg'
import {
	STATION_PROFILE_ENDPOINT,
	STATIONS_FILTERS_ENDPOINT,
} from '@common/consts/endpoints'
import { useNavigate } from 'react-router'
import FiltersButton from '@components/ui/filtersButton/FiltersButton'
import { useContext, useEffect, useState } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import { useStationsListQueryParser, useStationsLoader } from './lib/hooks'
import { createQueryString } from '@common/functions/strings'
import {
	StationProfilePageQueryArguments,
	StationProfilePreviousPageQueries,
	StationsFiltersPageQueryArguments,
	StationsFiltersPreviousPageQueries,
} from '@common/consts/pages'
import ListLayout from '@layouts/listLayout/ListLayout'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import StationCard from '@components/stationCard/StationCard'
import { StationDto } from '@common/types/stations'
import PageLayout from '@layouts/pageLayout/PageLayout'
import Search from '@components/ui/search/Search'
import EmptyDataNotification from '@components/emptyDataNotification/EmptyDataNotification'
import chargeStationImage from '@assets/images/charge-station.svg'

/**
 * Страница со списком станций
 */
export default function StationsPage(): React.JSX.Element {
	const nav = useNavigate()
	const { stations, setStations, stationFilters, setStationFilters } =
		useContext(RootStateContext)

	const { pageQueries } = useStationsListQueryParser()
	const { getByOffsetAndLimit, updateStationsByName, loading } =
		useStationsLoader()

	const [searchWasChange, setSearchWasChange] = useState<boolean>(false)
	const [timerId, setTimerId] = useState<number | undefined>()

	useEffect(() => {
		if (!searchWasChange) return

		clearTimeout(timerId)
		setTimerId(
			setTimeout(() => {
				updateStationsByName(stationFilters.partOfName)
				setTimerId(undefined)
			}, 2500)
		)
	}, [stationFilters.partOfName])

	const onFiltersClick = () => {
		nav(
			STATIONS_FILTERS_ENDPOINT +
				createQueryString([
					{
						key: StationsFiltersPageQueryArguments.PREVIOUS_PAGE,
						value: StationsFiltersPreviousPageQueries.STATIONS_LIST,
					},
				])
		)
	}

	const onStationClick = (id: string) => {
		nav(
			STATION_PROFILE_ENDPOINT +
				id +
				createQueryString([
					{
						key: StationProfilePageQueryArguments.PREVIOUS_PAGE,
						value: StationProfilePreviousPageQueries.STATIONS_LIST,
					},
				])
		)
	}

	return (
		<PageLayout
			onReturn={() => nav('/')}
			title='Список станций'
			headerContent={
				<FiltersButton
					iconSrc={tuningImage}
					onClick={onFiltersClick}
					variant='fill'
				/>
			}
			className={styles.page}
		>
			<div className={styles.page__stationsList}>
				<Search
					variant='outlined'
					placeholder='Название станции'
					focus={pageQueries.search_focused}
					value={stationFilters.partOfName}
					onChange={v => {
						setStationFilters({ ...stationFilters, partOfName: v })
						setSearchWasChange(true)
					}}
				/>
				<ListLayout
					disable
					items={stations.map((value, index) => {
						return (
							<ContentBlockLayout
								key={index}
								className={styles.stationsList__station}
							>
								<StationCard
									onClick={() => onStationClick(value.id)}
									station={value}
									showDistance
								/>
							</ContentBlockLayout>
						)
					})}
					getData={(offset, limit) => getByOffsetAndLimit(offset, limit)}
					onDataLoad={data => setStations(data as StationDto[])}
					loading={loading || undefined !== timerId}
					emptyListNotify={
						<EmptyDataNotification
							text='Здесь будут показаны зарядные станции'
							iconSrc={chargeStationImage}
						/>
					}
				/>
			</div>
		</PageLayout>
	)
}
