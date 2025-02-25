import styles from './styles.module.scss'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import ConnectorCard from '@components/ui/connectorCard/ConnectorCard'
import ResetFiltersButton from '@components/ui/resetFiltersButton/ResetFiltersButton'
import refreshImageDisabled from '@assets/images/refresh-icon-disabled.svg'
import refreshImageActive from '@assets/images/refresh-icon-active.svg'
import Button from '@components/ui/button/Button'
import Switch from '@components/ui/switch/Switch'
import { useState } from 'react'
import { ConnectorStandard } from '@common/types/stations'
import { CONNECTORS } from '@common/consts/stations'

export default function StationFilters(): React.JSX.Element {
    const [selectedFilters, setSelectedFilters] = useState<ConnectorStandard[]>([...CONNECTORS]);
    const [isOnlyAvailableEnabled, setIsOnlyAvailableEnabled] = useState<boolean>(true);
    const [isModified, setIsModified] = useState<boolean>(false);

    const handleConnectorChange = (connector: ConnectorStandard, enabled: boolean) => {
        setSelectedFilters((prev) => {
            const newFilters: ConnectorStandard[] = enabled
                ? [...prev, connector]
                : prev.filter((item) => item !== connector);
    
            const isStateDefault = 
                newFilters.length === CONNECTORS.length &&
                newFilters.every((item) => (CONNECTORS as ConnectorStandard[]).includes(item)) &&
                isOnlyAvailableEnabled;
    
            setIsModified(!isStateDefault);
            return newFilters;
        });
    };
    
    const handleSwitchChange = (enabled: boolean) => {
        setIsOnlyAvailableEnabled(enabled);
    
        const isStateDefault = 
            selectedFilters.length === CONNECTORS.length &&
            selectedFilters.every((item) => (CONNECTORS as ConnectorStandard[]).includes(item)) &&
            enabled;
    
        setIsModified(!isStateDefault);
    };

    const resetFilters = () => {
        setSelectedFilters([...CONNECTORS]);
        setIsOnlyAvailableEnabled(true);
        setIsModified(false);
    };

    return (
        <div className={styles.stationFilters}>
            <ContentBlockLayout>
                <div className={styles.stationFilters__onlyAvailableBlock}>
                    <span className={styles.onlyAvailableBlock__text}>Только доступные</span>
                    <Switch onChange={handleSwitchChange} enabled={isOnlyAvailableEnabled} />
                </div>
            </ContentBlockLayout>
            <div className={styles.stationFilters__minimalPowerBlock}>
                <span className={styles.minimalPowerBlock__text}>Минимальная мощность, кВт</span>
            </div>
            <ContentBlockLayout>
                <span style={{ height: '60px', display: 'block' }}>Здесь будет слайдер</span>
            </ContentBlockLayout>
            <div className={styles.stationFilters__connectorsBlock}>
                <div className={styles.connectorsBlock__tittle}>
                    <span className={styles.tittle__text}>Коннекторы</span>
                </div>
                <ContentBlockLayout>
                    <div className={styles.connectorsBlock__list}>
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("Type 1", enabled)}
                            connector={"Type 1" as ConnectorStandard}
                            enabled={selectedFilters.includes("Type 1")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("Type 2", enabled)}
                            connector={"Type 2" as ConnectorStandard}
                            enabled={selectedFilters.includes("Type 2")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("CCS1", enabled)}
                            connector={"CCS1" as ConnectorStandard}
                            enabled={selectedFilters.includes("CCS1")}
                        />
                    </div>
                </ContentBlockLayout>
                <ContentBlockLayout>
                    <div className={styles.connectorsBlock__list}>
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("CCS2", enabled)}
                            connector={"CCS2" as ConnectorStandard}
                            enabled={selectedFilters.includes("CCS2")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("GB/T (AC)", enabled)}
                            connector={"GB/T (AC)" as ConnectorStandard}
                            enabled={selectedFilters.includes("GB/T (AC)")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("GB/T (DC)", enabled)}
                            connector={"GB/T (DC)" as ConnectorStandard}
                            enabled={selectedFilters.includes("GB/T (DC)")}
                        />
                    </div>
                </ContentBlockLayout>
                <ContentBlockLayout>
                    <div className={styles.connectorsBlock__listWithTwoElements}>
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("CHAdeMO", enabled)}
                            connector={"CHAdeMO" as ConnectorStandard}
                            enabled={selectedFilters.includes("CHAdeMO")}
                        />
                        <ConnectorCard
                            onChange={(enabled) => handleConnectorChange("Tesla", enabled)}
                            connector={"Tesla" as ConnectorStandard}
                            enabled={selectedFilters.includes("Tesla")}
                        />
                    </div>
                </ContentBlockLayout>
            </div>
            <div className={styles.stationFilters__footer}>
                <ResetFiltersButton
                    onClick={resetFilters}
                    disabled={!isModified}
                    activeIcon={refreshImageActive}
                    disabledIcon={refreshImageDisabled}
                    text="Сбросить фильтры"
                />
                <Button onClick={() => {}} variant="fill" text="Применить" disabled={!isModified} />
            </div>
        </div>
    );
}