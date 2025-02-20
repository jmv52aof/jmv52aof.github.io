import styles from './styles.module.scss'
import Switch from '@components/ui/switch/Switch'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrowLeft.svg'
import FiltersBlock from '@layouts/filtersBlock/FiltersBlock'
import StationFilters from '@features/stationFilters/StationFilters'

/**
 * Страница с фильтрами
 */
export default function FiltesrPage(): React.JSX.Element {
	return (
		<div className={styles.page}>
			<div className={styles.contentWrapper}>
				<div className={styles.header}>
					<div className={styles.headerButton}>
						<ReturnButton onClick={() => {}} iconSrc={arrowImage} />
					</div>	
					<div className={styles.headerTittle}> 
						<span className={styles.headerText}>Фильтры</span>
					</div>
				</div>
				<div className={styles.main}>
					<FiltersBlock>
						<div className={styles.firstBlock}>
							<span className={styles.firstBlockText}>Только доступные</span>
							<Switch onChange={(enabled) => { }} />
						</div>
					</FiltersBlock>
					<StationFilters>
						
					</StationFilters>
				</div>
			</div>
		</div>
	)
}