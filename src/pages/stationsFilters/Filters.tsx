import styles from './styles.module.scss'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import StationFiltersFeature from '@features/stationFilters/StationFilters'
import commonStyles from '@common/styles.module.scss'

/**
 * Страница с фильтрами
 */
export default function StationsFiltersPage(): React.JSX.Element {
	return (
		<div className={commonStyles.page}>
			<div className={styles.page__content}>
				<div className={styles.content__header}>
					<div className={styles.header__button}>
						<ReturnButton onClick={() => {}} iconSrc={arrowImage} />
					</div>
					<a className={styles.header__tittle}>Фильтры</a>
				</div>
				<StationFiltersFeature />
			</div>
		</div>
	)
}
