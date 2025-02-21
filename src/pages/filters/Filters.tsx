import { useState } from 'react'
import styles from './styles.module.scss'
import Switch from '@components/ui/switch/Switch'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrowLeft.svg'
import FiltersBlock from '@layouts/filtersBlock/FiltersBlock'
import StationFilters from '@features/stationFilters/StationFilters'

/**
 * Страница с фильтрами
 */
export default function FiltersPage(): React.JSX.Element {
    const [isOnlyAvailableEnabled, setIsOnlyAvailableEnabled] = useState(true);

    const handleSwitchChange = (enabled: boolean) => {
        setIsOnlyAvailableEnabled(enabled);
    };

    return (
        <div className={styles.filtersPage}>
            <div className={styles.filtersPage__content}>
                <div className={styles.filtersPage__content__header}>
                    <div className={styles.header__button}>
                        <ReturnButton onClick={() => {}} iconSrc={arrowImage} />
                    </div>
                    <div className={styles.header__tittle}>
                        <span className={styles.header__text}>Фильтры</span>
                    </div>
                </div>
                <div className={styles.filtersPage__content__main}>
                    <FiltersBlock>
                        <div className={styles.filtersPage__content__main__onlyAvailable}>
                            <span className={styles.onlyAvailable__text}>Только доступные</span>
                            <Switch onChange={handleSwitchChange} enabled={isOnlyAvailableEnabled} />
                        </div>
                    </FiltersBlock>
                    <StationFilters isOnlyAvailableEnabled={isOnlyAvailableEnabled} onReset={() => setIsOnlyAvailableEnabled(false)} />
                </div>
            </div>
        </div>
    );
}