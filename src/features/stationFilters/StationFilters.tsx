import styles from './styles.module.scss'
import FiltersBlock from '@layouts/filtersBlock/FiltersBlock'
import ConnectorCard from '@components/ui/connectorCard/ConnectorCard'
import type1Image from '@assets/images/connectors/type1.svg'
import type2Image from '@assets/images/connectors/type2.svg'
import ccs1Image from '@assets/images/connectors/ccs1.svg'
import ccs2Image from '@assets/images/connectors/ccs2.svg'
import gbtacImage from '@assets/images/connectors/gbt-ac.svg'
import gbtdcImage from '@assets/images/connectors/gbt-dc.svg'
import chademoImage from '@assets/images/connectors/chademo.svg'
import teslaImage from '@assets/images/connectors/tesla.svg'
import ResetFiltersButton from '@components/ui/resetFiltersButton/ResetFiltersButton'
import refreshImageDisabled from '@assets/images/refreshIconDisabled.svg'
import refreshImageActive from '@assets/images/refreshIconActive.svg'
import ApplyButton from '@components/ui/applyButton/ApplyButton'
import { useState, useEffect } from 'react'

type Props = {
    isOnlyAvailableEnabled: boolean;
    onReset: () => void;
};

export default function StationFilters({ isOnlyAvailableEnabled, onReset }: Props): React.JSX.Element {
    const defaultConnectors = new Set(['Type 1', 'Type 2', 'CCS1', 'CCS2', 'GB/T (AC)', 'GB/T (DC)', 'CHAdeMO', 'Tesla']);
    const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set(defaultConnectors));

    useEffect(() => {
        setSelectedFilters(new Set(defaultConnectors)); // Все фильтры включены по умолчанию
    }, []);

    const handleConnectorChange = (text: string, enabled: boolean) => {
        setSelectedFilters((prev) => {
            const newFilters = new Set(prev);
            if (enabled) {
                newFilters.add(text);
            } else {
                newFilters.delete(text);
            }
            return newFilters;
        });
    };

    const resetFilters = () => {
        setSelectedFilters(new Set()); // Выключаем все фильтры
        onReset();
    };

    const hasActiveFilters = isOnlyAvailableEnabled || selectedFilters.size > 0;

    return (
        <div className={styles.stationFilters}>
            <div className={styles.stationFilters__minimalPowerBlock}>
                <span className={styles.stationFilters__minimalPowerBlock__text}>Минимальная мощность, кВт</span>
            </div>
            <FiltersBlock>
                <span style={{ height: '60px', display: 'block' }}>Здесь будет слайдер</span>
            </FiltersBlock>
            <div className={styles.stationFilters__connectorsBlock}>
                <div className={styles.stationFilters__connectorsBlock__tittle}>
                    <span className={styles.stationFilters__connectorsBlock__tittle__text}>Коннекторы</span>
                </div>
                <FiltersBlock>
                    <div className={styles.stationFilters__connectorsBlock__list}>
                        <ConnectorCard 
                            onChange={(enabled) => handleConnectorChange("Type 1", enabled)} 
                            text="Type 1" 
                            iconSrc={type1Image} 
                            enabled={selectedFilters.has("Type 1")} 
                        />
                        <ConnectorCard 
                            onChange={(enabled) => handleConnectorChange("Type 2", enabled)} 
                            text="Type 2" 
                            iconSrc={type2Image} 
                            enabled={selectedFilters.has("Type 2")} 
                        />
                        <ConnectorCard 
                            onChange={(enabled) => handleConnectorChange("CCS1", enabled)} 
                            text="CCS1" 
                            iconSrc={ccs1Image} 
                            enabled={selectedFilters.has("CCS1")} 
                        />
                    </div>
                </FiltersBlock>
                <FiltersBlock>
                    <div className={styles.stationFilters__connectorsBlock__list}>
                        <ConnectorCard 
                            onChange={(enabled) => handleConnectorChange("CCS2", enabled)} 
                            text="CCS2" 
                            iconSrc={ccs2Image} 
                            enabled={selectedFilters.has("CCS2")} 
                        />
                        <ConnectorCard 
                            onChange={(enabled) => handleConnectorChange("GB/T (AC)", enabled)} 
                            text="GB/T (AC)" 
                            iconSrc={gbtacImage} 
                            enabled={selectedFilters.has("GB/T (AC)")} 
                        />
                        <ConnectorCard 
                            onChange={(enabled) => handleConnectorChange("GB/T (DC)", enabled)} 
                            text="GB/T (DC)" 
                            iconSrc={gbtdcImage} 
                            enabled={selectedFilters.has("GB/T (DC)")} 
                        />
                    </div>
                </FiltersBlock>
                <FiltersBlock>
                    <div className={styles.stationFilters__connectorsBlock__listWithTwoElements}>
                        <ConnectorCard 
                            onChange={(enabled) => handleConnectorChange("CHAdeMO", enabled)} 
                            text="CHAdeMO" 
                            iconSrc={chademoImage} 
                            enabled={selectedFilters.has("CHAdeMO")} 
                        />
                        <ConnectorCard 
                            onChange={(enabled) => handleConnectorChange("Tesla", enabled)} 
                            text="Tesla" 
                            iconSrc={teslaImage} 
                            enabled={selectedFilters.has("Tesla")} 
                        />
                    </div>
                </FiltersBlock>
            </div>
            <div className={styles.stationFilters__footer}>
                <ResetFiltersButton
                    onClick={resetFilters}
                    disabled={!hasActiveFilters}
                    activeIcon={refreshImageActive}
                    disabledIcon={refreshImageDisabled}
                    text="Сбросить фильтры"
                />
                <ApplyButton
                    onClick={() =>{}}
                    disabled={!hasActiveFilters}
                    text="Применить"
                />
            </div>
        </div>
    );
}
