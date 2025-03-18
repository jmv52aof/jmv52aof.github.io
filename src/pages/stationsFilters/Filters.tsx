import StationFiltersFeature from '@features/stationFilters/StationFilters'
import { useStationsFiltersQueryParser } from './lib/hooks'
import { useNavigate } from 'react-router'
import { StationsFiltersPreviousPageQueries } from '@common/consts/pages'
import { STATIONS_LIST_ENDPOINT } from '@common/consts/endpoints'
import PageLayout from '@layouts/pageLayout/PageLayout'
import styles from './styles.module.scss'

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
		<PageLayout
			onReturn={() => {
				const endpoint = getPreviousPageEndpoint()
				if (endpoint) nav(endpoint)
			}}
			title='Фильтры'
			className={styles.page}
		>
			<StationFiltersFeature />
		</PageLayout>
	)
}
