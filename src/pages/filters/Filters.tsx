import styles from './styles.module.scss'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import StationFilters from '@features/stationFilters/StationFilters'

/**
 * Страница с фильтрами
 */
export default function FiltersPage(): React.JSX.Element {
    return (
        <div className={styles.filtersPage}>
            <div className={styles.filtersPage__content}>
                <div className={styles.content__header}>
                    <div className={styles.header__button}>
                        <ReturnButton onClick={() => {}} iconSrc={arrowImage} />
                    </div>
                    <div className={styles.header__tittle}>
                        <span className={styles.header__text}>Фильтры</span>
                    </div>
                </div>
                <StationFilters />
            </div>
        </div>
    );
}