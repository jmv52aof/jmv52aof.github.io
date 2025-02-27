import styles from './styles.module.scss'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import ConnectorCard from '@components/ui/connectorCard/ConnectorCard'
import ResetFiltersButton from '@components/ui/resetFiltersButton/ResetFiltersButton'
import refreshImageActive from '@assets/images/refresh-icon-active.svg'
import Button from '@components/ui/button/Button'
import Switch from '@components/ui/switch/Switch'
import { useState } from 'react'
import { ConnectorStandard } from '@common/types/stations'
import { CONNECTORS } from '@common/consts/stations'
import { StationFilters } from './lib/types'
import { DEFAULT_FILTERS } from '@common/consts/stations'
import { isFiltersDefault } from './lib/functions'
import { useContext } from 'react'
import RootStateContext from '@common/context/RootStateContext'

export default function StationFiltersFeature(): React.JSX.Element {
    const [filters, setFilters] = useState<StationFilters>({
        connectors: [...CONNECTORS],
        onlyAvailableStations: true,
        minimalPower: 0,
        isModified: false,
    });

    const { stationFilters } = useContext(RootStateContext);

    const [isModified, setIsModified] = useState<boolean>(false);

    const handleConnectorChange = (connector: ConnectorStandard, enabled: boolean) => {
        setFilters((prev) => ({
            ...prev,
            connectors: enabled
                ? [...prev.connectors, connector]
                : prev.connectors.filter((item) => item !== connector),
        }));
        setIsModified(true);
    };

    const handleSwitchChange = (enabled: boolean) => {
        setFilters((prev) => ({ ...prev, onlyAvailableStations: enabled }));
        setIsModified(true);
    };

    const applyFilters = () => {
        setIsModified(false);
    };

    const resetFilters = () => {
        setFilters({ ...DEFAULT_FILTERS });
        setIsModified(false);
    };

    return (
        <div className={styles.stationFilters}>
            <ContentBlockLayout>
                <div className={styles.stationFilters__onlyAvailable}>
                    <p className={styles.onlyAvailable__text}>Только доступные</p>
                    <Switch onChange={handleSwitchChange} enabled={filters.onlyAvailableStations} />
                </div>
            </ContentBlockLayout>
            <div className={styles.stationFilters__minimalPower}>
                <span className={styles.minimalPower__text}>Минимальная мощность, кВт</span>
                <ContentBlockLayout>
                    <span style={{ height: '60px', display: 'block' }}>Здесь будет слайдер</span>
                </ContentBlockLayout>
            </div>
            <div className={styles.stationFilters__connectors}>
                <div className={styles.connectors__tittle}>
                    <span className={styles.tittle__text}>Коннекторы</span>
                </div>
                <ContentBlockLayout>
                    <div className={styles.connectors__row}>
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("Type 1", enabled)}
                            connector={"Type 1" as ConnectorStandard}
                            enabled={filters.connectors.includes("Type 1")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("Type 2", enabled)}
                            connector={"Type 2" as ConnectorStandard}
                            enabled={filters.connectors.includes("Type 2")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("CCS1", enabled)}
                            connector={"CCS1" as ConnectorStandard}
                            enabled={filters.connectors.includes("CCS1")}
                        />
                    </div>
                </ContentBlockLayout>
                <ContentBlockLayout>
                    <div className={styles.connectors__row}>
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("CCS2", enabled)}
                            connector={"CCS2" as ConnectorStandard}
                            enabled={filters.connectors.includes("CCS2")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("GB/T (AC)", enabled)}
                            connector={"GB/T (AC)" as ConnectorStandard}
                            enabled={filters.connectors.includes("GB/T (AC)")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("GB/T (DC)", enabled)}
                            connector={"GB/T (DC)" as ConnectorStandard}
                            enabled={filters.connectors.includes("GB/T (DC)")}
                        />
                    </div>
                </ContentBlockLayout>
                <ContentBlockLayout>
                    <div className={styles.connectors__lastRow}>
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("CHAdeMO", enabled)}
                            connector={"CHAdeMO" as ConnectorStandard}
                            enabled={filters.connectors.includes("CHAdeMO")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("Tesla", enabled)}
                            connector={"Tesla" as ConnectorStandard}
                            enabled={filters.connectors.includes("Tesla")}
                        />
                    </div>
                </ContentBlockLayout>
            </div>
            <div className={styles.stationFilters__footer}>
                <ResetFiltersButton
                    onClick={resetFilters}
                    disabled={isFiltersDefault(filters)}
                    iconSrc={refreshImageActive}
                    text="Сбросить фильтры"
                />
                <Button onClick={applyFilters} variant="fill" text="Применить" disabled={!isModified} />
            </div>
        </div>
    );
}