import styles from './styles.module.scss'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import StationCard from '@components/stationCard/StationCard'
import tuningImage from '@assets/images/tuning.svg'
import Search from '@components/ui/search/Search'
import { STATIONS_LIST_FILTERS_ENDPOINT } from '@common/consts/endpoints'
import { useNavigate } from 'react-router'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import FiltersButton from '@components/ui/filtersButton/FiltersButton'

/**
 * Страница со списком станций
 */
export default function StationsPage(): React.JSX.Element {

    const nav = useNavigate();

    const handleClick = () => {
        nav(`#${STATIONS_LIST_FILTERS_ENDPOINT}`);
    };

    return (
        <div className={styles.stationsPage}>
            <div className={styles.stationsPage__header}>
                <div className={styles.header__content}>
                    <ReturnButton onClick={() => {}} iconSrc={arrowImage} />
                    <div className={styles.content__tittle}>
                        <span className={styles.content__text}>Список станций</span>
                    </div>
                    <FiltersButton iconSrc={tuningImage} onClick={handleClick} variant='fill' />
                </div>
                <Search variant='outlined' placeholder='Название станции'/>
            </div>
            <div className={styles.stationsPage__stationList}>
                <ContentBlockLayout className={styles.ContentBlocHover}>
                    <StationCard
                        onClick={() => console.log("Station clicked")}
                        station={{
                            id: "1",
                            name: "Отель Кукарский двор",
                            address: "г. Киров, ул. Дзержинского, 110",
                            status: "Доступна",
                            coordinates: { latitude: "0", longitude: "0" },
                            connectors: [
                                { evse_uid: "1", id: "1", standard: "Type 1", status: "Доступен", format: "Кабель", power_type: "AC", max_voltage: 230, max_amperage: 32, max_electric_power: 22 },
                                { evse_uid: "2", id: "2", standard: "GB/T (AC)", status: "Занят", format: "Кабель", power_type: "AC", max_voltage: 230, max_amperage: 32, max_electric_power: 20 },
                                { evse_uid: "3", id: "3", standard: "CCS2", status: "Недоступен", format: "Кабель", power_type: "DC", max_voltage: 400, max_amperage: 125, max_electric_power: 40 }
                            ],
                            rating: 4.7,
                            metres_to_station: 2.94
                        }}
                    />
                </ContentBlockLayout>
                <ContentBlockLayout className={styles.ContentBlocHover}>
                    <StationCard
                        onClick={() => console.log("Station clicked")}
                        station={{
                            id: "2",
                            name: "Отель 2020",
                            address: "г. Киров, ул. Дзержинского, 110",
                            status: "Не работает",
                            coordinates: { latitude: "0", longitude: "0" },
                            connectors: [
                                { evse_uid: "1", id: "1", standard: "Type 1", status: "Недоступен", format: "Кабель", power_type: "AC", max_voltage: 230, max_amperage: 32, max_electric_power: 22 },
                                { evse_uid: "2", id: "2", standard: "GB/T (AC)", status: "Занят", format: "Кабель", power_type: "AC", max_voltage: 230, max_amperage: 32, max_electric_power: 20 },
                                { evse_uid: "3", id: "3", standard: "CCS2", status: "Недоступен", format: "Кабель", power_type: "DC", max_voltage: 400, max_amperage: 125, max_electric_power: 40 }
                            ],
                            rating: 3.6,
                            metres_to_station: 3.45
                        }}
                    />
                </ContentBlockLayout>
            </div>
        </div>
    );
}