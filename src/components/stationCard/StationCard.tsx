import styles from "./styles/card.module.scss"
import { STATION_STATUS_COLORS } from "@common/consts/stations"
import electricRefuelingImage from '@assets/images/electric-refueling.svg'
import pathImage from '@assets/images/path.svg'
import ratingImage from '@assets/images/ratingStar.svg'
import { StationDto } from "@common/types/stations"
import Connector from "./components/connector/Connector"

type Props = {
    onClick: () => void;
    station: StationDto;
};

export default function StationCard(props: Props) {

    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    const connectorsToRender = props.station.connectors.length > 0 ? props.station.connectors : [props.station.connectors[0]];

    return (
        <div
            className={styles.stationCard}
            onClick={handleClick}
        >
            <div className={styles.stationCard__header}>
                <div
                    className={`${styles.header__icon} ${styles[`icon_${STATION_STATUS_COLORS[props.station.status]}`]}`}
                >
                    <img src={electricRefuelingImage} alt="electric-refueling" />
                </div>
                <div className={styles.header__content}>
                    <div className={styles.content__stationInfo}>
                        <p className={styles.stationInfo__text1}>{props.station.name}</p>
                        <p className={styles.stationInfo__text2}>{props.station.address}</p>
                    </div>
                    <div className={styles.content__path}>
                        <div className={styles.path__icon}>
                            <img src={pathImage} alt="path" />
                        </div>
                        {undefined !== props.station.metres_to_station && <p className={styles.path__text}>{props.station.metres_to_station} км</p>}
                    </div>
                </div>
            </div>
            <div className={styles.stationCard__body}>
                <div className={styles.body__connectorsList}>
                    <div className={styles.connectorsList}>
                        {connectorsToRender.map((connector, index) => (
                            <Connector key={connector.id} connector={connector} isLast={index === connectorsToRender.length - 1} />
                        ))}
                    </div>
                </div>
                <div className={styles.body__rating}>
                    <div className={styles.rating__content}>
                        <img src={ratingImage} alt='rating'/>
                        <p className={styles.content__text}>{props.station.rating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}