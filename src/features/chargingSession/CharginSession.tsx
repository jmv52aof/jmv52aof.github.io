import { ChargingSessionDto } from "@common/types/chargingSessions"
import PieChart from '@components/pieChart/PieChart'
import Button from '@components/ui/button/Button'
import ChargingSessionInfo from '@components/station/chargingSessionInfo/ChargingSessionInfo'
import lightingIcon from '@assets/images/lighting-fill-blue.svg'
import styles from './styles.module.scss'

interface Props {
    chargingSession: ChargingSessionDto    
}

export default function ChargingSessionFeatures(props: Props): React.JSX.Element {

    const onComplete = () => {
        //TODO
    }
    
    return (
        <>
            <div className={styles.chargerBlock_position}>
                <div className={styles.chargerBlock}>
                    <div className={styles.chargerBlock_flex}>
                        <img className={styles.chargerBlock__img } src={lightingIcon}/>
                        {props.chargingSession.charged_kwh !== 0 && 
                            <span className={styles.chargerBlock__text}>
                            {props.chargingSession.charged_kwh} кВт</span>}
                    </div>                    
                </div>
                <PieChart value={22.4} maxValue={34} colorTemplate='blue' className={styles.pieChart}/>
            </div>
            <div className={styles.buttonBlock}>
                <Button variant='fill' onClick={onComplete} text='Завершить'/>
            </div>
            <ChargingSessionInfo chargingSession={props.chargingSession}/>
        </>
    )
}