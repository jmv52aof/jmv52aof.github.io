import { Timestamp } from "@common/types/date"
import { ConnectorInfoDto } from "@common/types/stations"
import { ConnectorTariffDto } from "@common/types/tariffs"
import styles from './styles.module.scss'
import { CONNECTOR_HAS_ICON } from "@common/consts/stations"
import Button from "@components/ui/button/Button"
import squareShareLineIcon from '@assets/images/square-share-line.svg'
import walletIcon from '@assets/images/wallet.svg'
import batteryChargeIcon from '@assets/images/battery-charge.svg'
import clockIcon from '@assets/images/clock.svg'
import { timeToISOString, timeToString } from "@common/functions/date"
import lightingIcon from '@assets/images/lighting.svg'
import { ChargingSessionStatus } from "@common/types/chargingSessions"

interface Props {
    tariffs?: ConnectorTariffDto[]
    connectorInfo: ConnectorInfoDto
    charged: number
    status: ChargingSessionStatus
	batteryPercentage?: number
    start: Timestamp
    duration: Timestamp
    currentPower?: number
	maxPower?: number
	minPower?: number
}

export default function ChargingSessionInfo(props: Props): React.JSX.Element {
    const onClick = () => {
        //TODO
    }
    return(
        <div className={styles.info}>
            <div className={`${styles.info__section} ${styles.connectorSection}`}>
                <div className={styles.connectorSection__connectorImgBlock}>
                    <img
                        className={styles.connectorImgBlock__img}
                        src={CONNECTOR_HAS_ICON[props.connectorInfo.standard]} 
                        alt={props.connectorInfo.standard} />
                    <span className={styles.connectorImg__label}>{props.connectorInfo.standard}</span>
                </div>
                <div className={styles.connectorBlock__details}>
                    <div className={styles.details__connector}>
                        <div className={styles.connector__connectorTextBlock}>
                            <span className={styles.connectorTextBlock__title}>{props.connectorInfo.station_name}</span>
                            <span className={styles.connectorTextBlock__subtitle}>{props.connectorInfo.station_address}</span>
                        </div>
                        <Button variant="icon" onClick={onClick} iconSrc={squareShareLineIcon}/>
                    </div>
                    <div className={styles.details__tariffs}>
                        <span className={styles.tariffs__title}><img src={walletIcon} /> Используемые тарифы:</span>
                        <span className={styles.tariffs__text}>{props.tariffs?.map(item => `${item.price} ${item.currency}`).join(' ')}</span>
                    </div>
                </div>
            </div>
            <div className={styles.info__sectionWrapper}>
                <h2 className={styles.sectionWrapper__title}>Заряд:</h2>
                <div className={styles.info__section}>
                    <img src={batteryChargeIcon} alt="" />
                    <div className={styles.section__content}>
                        <p className={`${styles.content__text} ${styles.content__text_width}`}>
                            Заряжено: <span className={styles.content__text_color}>{props.charged} кВт·ч</span>
                        </p>
                        {props.status === 'Зарядка' && <p className={styles.content__text}>
                            Процент батареи: <span className={styles.content__text_color}>{props.batteryPercentage}%</span>
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
                                {' ' + timeToISOString(props.start.hours, props.start.minutes, props.start.seconds)}
                            </span>
                        </p>
                        <p className={styles.content__text}>
                            Длительность: 
                            <span className={styles.content__text_color}>
                                {' ' + timeToString(props.duration.hours, props.duration.minutes, props.duration.seconds)}                                
                            </span>
                        </p>
                    </div>
                    
                </div>
            </div>
            {props.status === 'Зарядка' && <div className={styles.info__sectionWrapper}>
                <h2 className={styles.sectionWrapper__title}>Мощность:</h2>            
                <div className={styles.info__section}>
                    <img src={lightingIcon} alt="" />
                    <div className={`${styles.section__content} ${styles.section_flexWrap}`}>
                        <div className={styles.content_flex}>
                            <p className={`${styles.content__text} ${styles.content__text_width}`}>
                                Максимальная: 
                                <span className={styles.content__text_color}>{props.maxPower}</span>
                            </p>
                            <p className={styles.content__text}>
                                Минимальная: 
                                <span className={styles.content__text_color}>{props.minPower}</span>
                            </p>
                        </div>
                        <div className={styles.content_flex}>
                            <p className={`${styles.content__text} ${styles.content__text_width}`}>
                                Текущая: 
                                <span className={styles.content__text_color}>{props.currentPower ?? 0}</span>
                            </p>
                            <p className={styles.content__text}>
                                Средняя: 
                                <span className={styles.content__text_color}>
                                    {((props.maxPower ?? 0) + (props.minPower ?? 0)) / 2}
                                </span>
                            </p>
                        </div>
                    </div>                    
                </div>
            </div>}           
        </div>
    )
}