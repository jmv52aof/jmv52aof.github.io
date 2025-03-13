import styles from './styles.module.scss'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import tuningImage from '@assets/images/tuning.svg'
import {
	STATION_PROFILE_ENDPOINT,
	STATIONS_FILTERS_ENDPOINT,
} from '@common/consts/endpoints'
import { useNavigate } from 'react-router'
import FiltersButton from '@components/ui/filtersButton/FiltersButton'
import { useContext } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import { useStationsLoader } from './lib/hooks'
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
import commonStyles from '@common/styles.module.scss'

/**
 * Страница со списком станций
 */
export default function StationsPage(): React.JSX.Element {
	const nav = useNavigate()
	const { stations, setStations } = useContext(RootStateContext)

	const { getByOffsetAndLimit, loading } = useStationsLoader()

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
		<div className={commonStyles.page}>
			<div className={styles.stationsPage__header}>
				<div className={styles.header__content}>
					<ReturnButton onClick={() => nav('/')} iconSrc={arrowImage} />
					<div className={styles.content__tittle}>
						<span className={styles.content__text}>Список станций</span>
					</div>
					<FiltersButton
						iconSrc={tuningImage}
						onClick={onFiltersClick}
						variant='fill'
					/>
				</div>
				{/* <Search variant='outlined' placeholder='Название станции' /> */}
			</div>
			<div className={styles.stationsPage__stationList}>
				<ListLayout
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
					loading={loading}
				/>
			</div>
		</div>
	)
}
