import styles from './styles.module.scss'
import StationFiltersFeature from '@features/stationFilters/StationFilters'
import commonStyles from '@common/styles.module.scss'
import { useStationsFiltersQueryParser } from './lib/hooks'
import { useNavigate } from 'react-router'
import { StationsFiltersPreviousPageQueries } from '@common/consts/pages'
import { STATIONS_LIST_ENDPOINT } from '@common/consts/endpoints'
import PageHeader from '@features/header/Header'

/**
 * Страница с фильтрами
 */
export default function StationsFiltersPage(): React.JSX.Element {
	const nav = useNavigate()

	const { pageQueries } = useStationsFiltersQueryParser()

	const getPreviousPageEndpoint = (): string | undefined => {
		switch (pageQueries.prev_page) {
			case StationsFiltersPreviousPageQueries.MAIN:
				return '/'
			case StationsFiltersPreviousPageQueries.STATIONS_LIST:
				return STATIONS_LIST_ENDPOINT
		}
	}

	return (
		<div className={commonStyles.page}>
			<div className={styles.page__content}>
				<PageHeader
					onReturn={() => {
						const endpoint = getPreviousPageEndpoint()
						if (endpoint) nav(endpoint)
					}}
					title='Фильтры'
				/>
				<StationFiltersFeature />
			</div>
		</div>
	)
}
