import commonStyles from '@common/styles.module.scss'
import { useNavigate } from 'react-router'
import SessionFilters from '@features/sessionFilters/SessionFilters'
import { SESSIONS_HISTORY_ENDPOINT } from '@common/consts/endpoints'
import PageLayout from '@layouts/pageLayout/PageLayout'

/**
 * Страница с фильтрами
 */
export default function SessionsFiltersPage(): React.JSX.Element {
	const nav = useNavigate()

	return (
		<PageLayout
			onReturn={() => nav(SESSIONS_HISTORY_ENDPOINT)}
			title='Фильтры'
			className={commonStyles.page}
		>
			<SessionFilters />
		</PageLayout>
	)
}
