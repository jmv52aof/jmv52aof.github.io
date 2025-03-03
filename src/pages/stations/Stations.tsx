import styles from './styles.module.scss'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import StationFiltersFeature from '@features/stationFilters/StationFilters'
import StationCard from '@components/stationCard/StationCard'
import { ConnectorStandard } from '@common/types/stations'
import { StationStatus } from '@common/types/stations'
import Button from '@components/ui/button/Button'
import tuningImage from '@assets/images/tuning.svg'
import Search from '@components/ui/search/Search'
import { STATIONS_LIST_FILTERS_ENDPOINT } from '@common/consts/endpoints'

/**
 * Страница со списком станций
 */
export default function StationsPage(): React.JSX.Element {

    const handleClick = () => {
        window.location.href = `#${STATIONS_LIST_FILTERS_ENDPOINT}`;
    };

    return (
        <div className={styles.stationsPage}>
            <div className={styles.stationsPage__header}>
                <div className={styles.header__content}>
                    <ReturnButton onClick={() => {}} iconSrc={arrowImage} />
                    <div className={styles.content__tittle}>
                        <span className={styles.content__text}>Список станций</span>
                    </div>
                    <Button iconSrc={tuningImage} onClick={handleClick} variant='icon' />
                </div>
                <Search variant='outlined' placeholder='Название станции'/>
            </div>
            <div className={styles.stationsPage__stationList}>
                <div
                    style={{
                        boxShadow: "0px 4px 10px 0px #02272B1A",
                        transition: "border 0.3s ease-in-out",
                        border: "1px solid transparent",
                        borderRadius: "8px",
                        cursor: "pointer",
                        background: "#FFFFFF",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid #8E949F")}
                    onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid transparent")}
                >
                    <StationCard
                        onChange={(enabled) => (enabled)}
                        onClick={() => console.log("Station clicked")}
                        enabled={true}
                        connector={"Type 1" as ConnectorStandard}
                        name="Отель Кукарский двор"
                        status={"Доступна" as StationStatus}
                        address="г. Киров, ул. Дзержинского, 110"
                        rating={4.5}
                        metres_to_station={2.94}
                        disabled={false}
                    />
                </div>
            </div>
        </div>
    );
}