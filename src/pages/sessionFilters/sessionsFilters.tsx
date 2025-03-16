import styles from './styles.module.scss'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import commonStyles from '@common/styles.module.scss'
import { useSessionsFiltersQueryParser } from './lib/hooks'
import { useNavigate } from 'react-router'
import { SessionsFiltersPreviousPageQueries } from '@common/consts/pages'
import SessionFiltersFeature from '@features/sessionFilters/SessionFilters'
import { SESSIONS_LIST_ENDPOINT } from '@common/consts/endpoints'

/**
 * Страница с фильтрами
 */
export default function SessionsFiltersPage(): React.JSX.Element {
	const nav = useNavigate()

	const { pageQueries } = useSessionsFiltersQueryParser()

	const getPreviousPageEndpoint = (): string | undefined => {
		switch (pageQueries.prev_page) {
			case SessionsFiltersPreviousPageQueries.MAIN:
				return '/'
			case SessionsFiltersPreviousPageQueries.SESSIONS_LIST:
				return SESSIONS_LIST_ENDPOINT
		}
	}

	return (
		<div className={commonStyles.page}>
			<div className={styles.page__content}>
				<div className={styles.content__header}>
					<div className={styles.header__button}>
						<ReturnButton
							onClick={() => {
								const endpoint = getPreviousPageEndpoint()
								if (endpoint) nav(endpoint)
							}}
							iconSrc={arrowImage}
						/>
					</div>
					<a className={styles.header__tittle}>Фильтры</a>
				</div>
				<SessionFiltersFeature />
			</div>
		</div>
	)
}
