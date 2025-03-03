import styles from './styles.module.scss'
import commonStyles from '@common/styles.module.scss'
import arrowImage from '@assets/images/arrow-left.svg'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import { ConnectorTariffDto } from '@common/types/tariffs'
import { ConnectorInfoDto } from '@common/types/stations'
import { Timestamp } from '@common/types/date'
import PieChart from '@components/pieChart/PieChart'
import Button from '@components/ui/button/Button'
import ChargingSessionInfo from '@components/station/chargingSessionInfo/ChargingSessionInfo'
import lightingIcon from '@assets/images/lighting-fill-blue.svg'
import { ChargingSessionStatus } from '@common/types/chargingSessions'

export default function ChargingSessionPage(): React.JSX.Element {
    const status: ChargingSessionStatus = 'Зарядка'
    const charged = 22.4
    const tariffs: ConnectorTariffDto[] =  [
        {
            type: 'Энергия',
            price: 100,
            currency: 'руб'
        }, 
        {
            type: 'Энергия',
            price: 150,
            currency: 'руб'
        }]
    const connectorInfo: ConnectorInfoDto = {
        station_id: "123456789",
        station_name: "Зарядная станция Альфа",
        station_address: "Улица Ленина, 10",
        evse_uid: "EVSE-001",
        connector_id: "Connector-1",
        standard: 'CCS2',
        format: "Кабель",
        power_type: "AC-3"			
    }
    const start: Timestamp = {
        year: 2025,
        month: 3,
        day: 19,
        hours: 13,
        minutes: 2,
        seconds: 0
    }

    const duration: Timestamp = {
        year: 0,
        month: 0,
        day: 0,
        hours: 6,
        minutes: 25,
        seconds: 0
    }

    const onComplete = () => {
        //TODO
    }
    return(
        <div className={commonStyles.page}>
			<div className={styles.page__content}>
				<div className={styles.content__header}>
					<div className={styles.header__button}>
						<ReturnButton onClick={() => {}} iconSrc={arrowImage} />
					</div>
					<a className={styles.header__tittle}>Зарядная сессия</a>
				</div>                
                <div className={styles.chargerBlock__wrapper}>
                    <div className={styles.content__chargerBlock}>
                        <div className={styles.chargerBlock_flex}>
                            <img className={styles.chargerBlock__img } src={lightingIcon}/>
                            {status === 'Зарядка' && <span className={styles.chargerBlock__text}>{charged} кВт</span>}
                        </div>                    
                    </div>
                    <PieChart value={22.4} maxValue={34} colorTemplate='blue' className={styles.content_pieChart}/>
                </div>
                <div className={styles.content__buttonBlock}>
                    <Button variant='fill' onClick={onComplete} text='Завершить'/>
                </div>
                <ChargingSessionInfo 
                    tariffs={tariffs}
                    status={status}
                    connectorInfo={connectorInfo}
                    start={start}
                    duration={duration}
                    charged={charged}
                    batteryPercentage={66}
                    currentPower={16.6}
                    maxPower={22}
                    minPower={14}
                />
			</div>        
		</div>
    )
}