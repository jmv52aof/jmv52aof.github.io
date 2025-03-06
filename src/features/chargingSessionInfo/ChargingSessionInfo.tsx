import styles from './styles.module.scss'
import batteryChargeIcon from '@assets/images/battery-charge.svg'
import clockIcon from '@assets/images/clock.svg'
import { getTimesDifference, timeToISOString, timeToString } from "@common/functions/date"
import lightingIcon from '@assets/images/lighting.svg'
import { ChargingSessionDto} from "@common/types/chargingSessions"
import ConnectorAndTariffsInfo from '@components/connectorAndTariffsInfo/ConnectorAndTariffsInfo'
import ContentBlock from '@components/contentBlock/ContentBlock'
import { checkVisible } from './lib/functions'

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
            <ConnectorAndTariffsInfo 
                connectorInfo={props.chargingSession.connector_info}
                tariffs={props.chargingSession.tariffs}
            />
            <ContentBlock 
                title={'Заряд:'}
                items={[
                    {
                        iconSrc: batteryChargeIcon,
                        description: 'Заряжено: ',
                        value: `${props.chargingSession.charged_kwh} кВт·ч`
                    },
                    {
                        description: 'Процент батареи: ',
                        value: props.chargingSession.battery_percentage !== undefined 
                            ? `${props.chargingSession.battery_percentage}%`
                            : undefined,
                        checkVisible: (value) => value !== undefined
                    },
                ]}
            />
            <ContentBlock 
                title={'Время и длительность: '}
                items={[
                    {
                        iconSrc: clockIcon,
                        description: 'Старт: ',
                        value: timeToISOString(
                            props.chargingSession.start_date.hours, 
                            props.chargingSession.start_date.minutes, 
                            props.chargingSession.start_date.seconds
                        )
                    },
                    {
                        description: 'Длительность: ',
                        value: duration 
                            ? timeToString(duration.hours, duration.minutes, duration.seconds)
                            : undefined,
                        checkVisible: checkVisible
                    },
                ]}
            />
            {props.chargingSession.current_power !== undefined &&
                <ContentBlock 
                   title={'Мощность: '}
                   items={[
                       {
                            iconSrc: lightingIcon,
                            description: 'Максимальная: ',
                            value: props.chargingSession.max_power !== undefined 
                                ? `${props.chargingSession.max_power} кВт`
                                : undefined,
                             checkVisible: checkVisible
                       },
                       {
                            description: 'Минимальная: ',
                            value: props.chargingSession.min_power !== undefined 
                                ? `${props.chargingSession.min_power} кВт`
                                : undefined,
                            checkVisible: checkVisible
                       },
                       {
                            description: 'Текущая: ',
                            value: props.chargingSession.min_power !== undefined 
                                ? `${props.chargingSession.current_power} кВт`
                                : undefined,
                            checkVisible: checkVisible
                        },
                        {
                            description: 'Средная: ',
                            value: (props.chargingSession.min_power !== undefined && props.chargingSession.max_power !== undefined)
                                ? `${(props.chargingSession.max_power + props.chargingSession.min_power) / 2} кВт`
                                : undefined,
                            checkVisible: checkVisible
                        },
                   ]}
               />  
            }           
        </div>
    )
}