import { ChargingSessionDto } from "@common/types/chargingSessions"
import Button from '@components/ui/button/Button'
import styles from './styles.module.scss'
import ChargingSessionActivePower from "@components/chargingSessionActivePower/ChargingSessionActivePower"
import ConnectorAndTariffsInfo from "@components/connectorAndTariffsInfo/ConnectorAndTariffsInfo"
import ContentBlock from "@components/contentBlock/ContentBlock"
import lightingIcon from '@assets/images/lighting.svg'
import batteryChargeIcon from '@assets/images/battery-charge.svg'
import clockIcon from '@assets/images/clock.svg'
import { checkVisible } from './lib/functions'
import { dateToTimestamp, getTimesDifference, timeToISOString, timeToString } from "@common/functions/date"

interface Props {
    chargingSession: ChargingSessionDto    
}

export default function ChargingSession(props: Props): React.JSX.Element {
    const duration = props.chargingSession.end_date === undefined 
        ? getTimesDifference(dateToTimestamp(new Date()), props.chargingSession.start_date) 
        : getTimesDifference(props.chargingSession.end_date, props.chargingSession.start_date)

    const onComplete = () => {
        //TODO
    }
    
    return (
        <>
            <ChargingSessionActivePower 
                charged={props.chargingSession.charged_kwh} 
                batteryPercentage={props.chargingSession.battery_percentage ?? 0}/>
            <div className={styles.buttonBlock}>
                <Button variant='fill' onClick={onComplete} text='Завершить'/>
            </div>
            <div className={styles.info}>
                <ConnectorAndTariffsInfo 
                    connectorInfo={props.chargingSession.connector_info}
                    tariffs={props.chargingSession.tariffs}
                />
                <ContentBlock 
                    title={'Заряд:'}
                    iconSrc={batteryChargeIcon}
                    items={[
                        {
                            description: 'Заряжено: ',
                            value: `${props.chargingSession.charged_kwh} кВт·ч`
                        },
                        {
                            description: 'Процент батареи: ',
                            value: props.chargingSession.battery_percentage !== undefined 
                                ? `${props.chargingSession.battery_percentage} %`
                                : '',
                            checkVisible: checkVisible
                        },
                    ]}
                />
                <ContentBlock 
                    title={'Время и длительность: '}
                    iconSrc={clockIcon}
                    items={[
                        {
                            description: 'Старт: ',
                            value: timeToISOString(
                                props.chargingSession.start_date.hours, 
                                props.chargingSession.start_date.minutes, 
                                props.chargingSession.start_date.seconds
                            )
                        },
                        {
                            description: 'Длительность: ',
                            value: timeToString(duration.hours, duration.minutes, duration.seconds)
                        },
                    ]}
                />
                {props.chargingSession.current_power !== undefined &&
                    <ContentBlock 
                    title={'Мощность: '}
                    iconSrc={lightingIcon}
                    items={[
                        {
                                description: 'Максимальная: ',
                                value: props.chargingSession.max_power !== undefined 
                                    ? `${props.chargingSession.max_power} кВт`
                                    : '',
                                checkVisible: checkVisible
                        },
                        {
                                description: 'Минимальная: ',
                                value: props.chargingSession.min_power !== undefined 
                                    ? `${props.chargingSession.min_power} кВт`
                                    : '',
                                checkVisible: checkVisible
                        },
                        {
                                description: 'Текущая: ',
                                value: props.chargingSession.current_power !== undefined 
                                    ? `${props.chargingSession.current_power} кВт`
                                    : '',
                                checkVisible: checkVisible
                            },
                            {
                                description: 'Средная: ',
                                value: (props.chargingSession.min_power !== undefined && props.chargingSession.max_power !== undefined)
                                    ? `${(props.chargingSession.max_power + props.chargingSession.min_power) / 2} кВт`
                                    : '',
                                checkVisible: checkVisible
                            },
                    ]}
                />  
                }
            </div>
        </>
    )
}