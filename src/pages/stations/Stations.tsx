import styles from './styles.module.scss'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import StationCard from '@components/stationCard/StationCard'
import tuningImage from '@assets/images/tuning.svg'
import Search from '@components/ui/search/Search'
import { STATIONS_FILTERS_ENDPOINT } from '@common/consts/endpoints'
import { useNavigate } from 'react-router'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import FiltersButton from '@components/ui/filtersButton/FiltersButton'
import { useContext, useEffect } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import { useApi } from '@common/hooks/api'

/**
 * Страница со списком станций
 */
export default function StationsPage(): React.JSX.Element {
	const nav = useNavigate()
	const { getStationsFromApi } = useApi()
	const { stations, setStations } = useContext(RootStateContext)

	useEffect(() => {
		getStationsFromApi().then(res => {
			setStations(res)
		})
	}, [])

	const onFiltersClick = () => {
		nav(STATIONS_FILTERS_ENDPOINT)
	}

	return (
		<div className={styles.stationsPage}>
			<div className={styles.stationsPage__header}>
				<div className={styles.header__content}>
					<ReturnButton onClick={() => {}} iconSrc={arrowImage} />
					<div className={styles.content__tittle}>
						<span className={styles.content__text}>Список станций</span>
					</div>
					<FiltersButton
						iconSrc={tuningImage}
						onClick={onFiltersClick}
						variant='fill'
					/>
				</div>
				<Search variant='outlined' placeholder='Название станции' />
			</div>
			<div className={styles.stationsPage__stationList}>
				{stations.map((value, index) => {
					return (
						<ContentBlockLayout
							key={index}
							className={styles.stationsList__station}
						>
							<StationCard onClick={() => {}} station={value} />
						</ContentBlockLayout>
					)
				})}
			</div>
		</div>
	)
}
