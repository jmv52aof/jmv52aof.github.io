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
import refreshImageActive from '@assets/images/refrshIconActive.svg'

export default function StationFilters(): React.JSX.Element {
	return(
        <div className={styles.stationFilters}>
            <div className={styles.minimalPowerBlock}>
                <span className={styles.minimalPowerBlockText}>Минимальная мощность, кВт</span>
            </div>
            <FiltersBlock>
                <span style={{ height: "60px", display: "block" }}>Здесь будет слайдер</span>
            </FiltersBlock>
            <div className={styles.connectorsBlock}>
                <div className={styles.connectorsBlockTittle}>
                    <span className={styles.connectorsBlockText}>Коннекторы</span>
                </div>
                <FiltersBlock>
                    <div className={styles.connectorsList}>
                        <ConnectorCard onChange={(enabled) => { }} text="Type 1" iconSrc={type1Image}/>
                        <ConnectorCard onChange={(enabled) => { }} text="Type 2" iconSrc={type2Image}/>
                        <ConnectorCard onChange={(enabled) => { }} text="CCS1" iconSrc={ccs1Image}/>
                    </div>
                </FiltersBlock>
                <FiltersBlock>
                    <div className={styles.connectorsList}>
                        <ConnectorCard onChange={(enabled) => { }} text="CCS1" iconSrc={ccs2Image}/>
                        <ConnectorCard onChange={(enabled) => { }} text="GB/T (AC)" iconSrc={gbtacImage}/>
                        <ConnectorCard onChange={(enabled) => { }} text="GB/T (DC)" iconSrc={gbtdcImage}/>
                    </div>
                </FiltersBlock>
                <FiltersBlock>
                    <div className={styles.connectorsListWithTwoElements}>
                        <ConnectorCard onChange={(enabled) => { }} text="CHAdeMO" iconSrc={chademoImage}/>
                        <ConnectorCard onChange={(enabled) => { }} text="Tesla" iconSrc={teslaImage}/>
                    </div>
                </FiltersBlock>
            </div>
            <div className={styles.stationFiltersFooter}>
                <ResetFiltersButton 
                    onClick={() => {}}
                    disabled={true} 
                    activeIcon={refreshImageActive}
                    disabledIcon={refreshImageDisabled}
                    text="Сбросить фильтры"
                />
            </div>
        </div>
    )
}
