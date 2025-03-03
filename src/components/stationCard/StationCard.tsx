import { useState, useEffect } from "react"
import styles from "./styles.module.scss"
import Status from '@components/ui/status/Status'
import { ConnectorStandard } from "@common/types/stations"
import { CONNECTOR_HAS_ICON, CONNECTOR_STATUS_COLORS } from "@common/consts/stations"
import { ConnectorStatus } from "@common/types/stations"
import electricRefuelingImage from '@assets/images/electric-refueling.svg'
import pathImage from '@assets/images/path.svg'
import ratingImage from '@assets/images/ratingStar.svg'

type Props = {
    onChange: (enabled: boolean) => void;
    onClick?: () => void;
    enabled?: boolean;
    connectors: { 
        type: ConnectorStandard; 
        status: ConnectorStatus; 
        power: number;
    }[];
    name: string;
    address: string;
    rating?: number;
    metres_to_station?: number;
    disabled?: boolean;
};

export default function StationCard(props: Props) {
    const [isEnabled, setIsEnabled] = useState(props.enabled);

    useEffect(() => {
        setIsEnabled(props.enabled);
    }, [props.enabled]);

    const handleClick = () => {
        if (!props.disabled) {
            setIsEnabled(!isEnabled);
            props.onChange(!isEnabled);
        }
    };

    const connectorsToRender = props.connectors.length > 0 ? props.connectors : [props.connectors[0]];

    return (
        <div 
            className={`${styles.stationCard} ${isEnabled ? styles.card_enabled : ""} ${props.disabled ? styles.card_disabled : ""}`} 
            onClick={handleClick}
        >
            <div className={styles.stationCard__header}>
                <div className={styles.header__icon}>
                    <img src={electricRefuelingImage} alt="electric-refueling" />
                </div>
                <div className={styles.header__content}>
                    <div className={styles.content__stationInfo}>
                        <p className={styles.stationInfo__text1}>{props.name}</p>
                        <p className={styles.stationInfo__text2}>{props.address}</p>
                    </div>
                    <div className={styles.content__path}>
                        <div className={styles.path__icon}>
                            <img src={pathImage} alt="path" />
                        </div>
                        <p className={styles.path__text}>{props.metres_to_station} км</p>
                    </div>
                </div>
            </div>
            <div className={styles.stationCard__body}>
                <div className={styles.body__connectorsList}>
                    <div className={styles.connectorsList__wrap}>
                        {connectorsToRender.map((connector, index) => (
                            <div key={index} className={styles.connectorsList__connector}>
                                <div className={styles.connector__wrap}>
                                    <div className={styles.connector__icon}>
                                        <img src={CONNECTOR_HAS_ICON[connector.type]} alt={connector.type} />
                                    </div>
                                    <div className={styles.connector__info}>
                                        <p className={styles.info__text1}>{connector.type}</p>
                                        <p className={styles.info__text2}>{connector.power} кВт</p>
                                    </div>
                                </div>
                                <div className={styles.connector__veticalBorder}>
                                    <div className={styles.rectangle}></div>
                                </div>
                                <div className={styles.connector__status}>
                                    <Status textSize='small' text={connector.status} color={CONNECTOR_STATUS_COLORS[connector.status]}/>
                                </div>
                                <div className={styles.connector__horizontalBorder}>
                                    <div className={styles.rectangleH}></div>
                                </div>  //не отображается
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.body__rating}>
                    <div className={styles.rating__content}>
                        <img src={ratingImage} alt='rating'/>
                        <p className={styles.content__text}>{props.rating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}