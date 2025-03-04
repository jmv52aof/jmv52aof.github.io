import styles from './styles.module.scss'
import { CONNECTOR_HAS_ICON } from "@common/consts/stations"
import Button from "@components/ui/button/Button"
import squareShareLineIcon from '@assets/images/square-share-line.svg'
import walletIcon from '@assets/images/wallet.svg'
import batteryChargeIcon from '@assets/images/battery-charge.svg'
import clockIcon from '@assets/images/clock.svg'
import { getTimesDifference, timeToISOString, timeToString } from "@common/functions/date"
import lightingIcon from '@assets/images/lighting.svg'
import { ChargingSessionDto} from "@common/types/chargingSessions"

interface Props {
    chargingSession: ChargingSessionDto    
}

export default function ChargingSessionInfo(props: Props): React.JSX.Element {
    const duration = props.chargingSession.end_date === undefined 
        ? undefined 
        : getTimesDifference(props.chargingSession.end_date, props.chargingSession.start_date)        
    const onClick = () => {
        //TODO
    }
    return(
        <div className={styles.info}>
            <div className={`${styles.info__section} ${styles.connectorSection}`}>
                <div className={styles.connectorSection__connectorImgBlock}>
                    <img
                        className={styles.connectorImgBlock__img}
                        src={CONNECTOR_HAS_ICON[props.chargingSession.connector_info.standard]} 
                        alt={props.chargingSession.connector_info.standard} />
                    <span className={styles.connectorImg__label}>{props.chargingSession.connector_info.standard}</span>
                </div>
                <div className={styles.connectorBlock__details}>
                    <div className={styles.details__connector}>
                        <div className={styles.connector__connectorTextBlock}>
                            <span className={styles.connectorTextBlock__title}>
                                {props.chargingSession.connector_info.station_name}
                            </span>
                            <span className={styles.connectorTextBlock__subtitle}>
                                {props.chargingSession.connector_info.station_address}
                            </span>
                        </div>
                        <Button variant="icon" onClick={onClick} iconSrc={squareShareLineIcon}/>
                    </div>
                    <div className={styles.details__tariffs}>
                        <span className={styles.tariffs__title}><img src={walletIcon} /> Используемые тарифы:</span>
                        <span className={styles.tariffs__text}>
                            {props.chargingSession.tariffs?.map(item => `${item.price} ${item.currency}`).join(' ')}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.info__sectionWrapper}>
                <h2 className={styles.sectionWrapper__title}>Заряд:</h2>
                <div className={styles.info__section}>
                    <img src={batteryChargeIcon} alt="" />
                    <div className={styles.section__content}>
                        <p className={`${styles.content__text} ${styles.content__text_width}`}>
                            Заряжено: 
                            <span className={styles.content__text_color}>
                                {props.chargingSession.charged_kwh} кВт·ч
                            </span>
                        </p>
                        {props.chargingSession.battery_percentage !== undefined && <p className={styles.content__text}>
                            Процент батареи: 
                            <span className={styles.content__text_color}>
                                {props.chargingSession.battery_percentage}%
                            </span>
                        </p>}
                    </div>
                </div>
            </div>
            <div className={styles.info__sectionWrapper}>
                <h2 className={styles.sectionWrapper__title}>Время и длительность:</h2>
                <div className={styles.info__section}>
                    <img src={clockIcon} alt="" />
                    <div className={styles.section__content}>
                        <p className={`${styles.content__text} ${styles.content__text_width}`}>
                            Старт: 
                            <span className={styles.content__text_color}>
                                {' ' + timeToISOString(
                                    props.chargingSession.start_date.hours, 
                                    props.chargingSession.start_date.minutes, 
                                    props.chargingSession.start_date.seconds
                                )}
                            </span>
                        </p>
                        {duration !== undefined && <p className={styles.content__text}>
                            Длительность: 
                            <span className={styles.content__text_color}>
                                {' ' + timeToString(duration.hours, duration.minutes, duration.seconds)}                                
                            </span>
                        </p>}
                    </div>
                    
                </div>
            </div>
            {(props.chargingSession.current_power !== undefined 
                || props.chargingSession.min_power !== undefined 
                || props.chargingSession.max_power !== undefined) && 
            <div className={styles.info__sectionWrapper}>
                <h2 className={styles.sectionWrapper__title}>Мощность:</h2>            
                <div className={styles.info__section}>
                    <img src={lightingIcon} alt="" />
                    <div className={`${styles.section__content} ${styles.section_flexWrap}`}>
                        <div className={styles.content_flex}>
                            {props.chargingSession.max_power !== undefined && <p className={`${styles.content__text} ${styles.content__text_width}`}>
                                Максимальная: 
                                <span className={styles.content__text_color}>
                                    {props.chargingSession.max_power}
                                </span>
                            </p>}
                            {props.chargingSession.min_power !== undefined && <p className={styles.content__text}>
                                Минимальная: 
                                <span className={styles.content__text_color}>{props.chargingSession.min_power}</span>
                            </p>}
                        </div>
                        <div className={styles.content_flex}>
                            {props.chargingSession.current_power !== undefined && 
                                <p className={`${styles.content__text} ${styles.content__text_width}`}>
                                    Текущая: 
                                    <span className={styles.content__text_color}>{props.chargingSession.current_power}</span>
                                </p>}
                            {(props.chargingSession.max_power !== undefined && props.chargingSession.min_power !== undefined) && 
                                <p className={styles.content__text}>
                                    Средняя: 
                                    <span className={styles.content__text_color}>
                                        {((props.chargingSession.max_power) + (props.chargingSession.min_power)) / 2}
                                    </span>
                                </p>}
                        </div>
                    </div>                    
                </div>
            </div>}           
        </div>
    )
}