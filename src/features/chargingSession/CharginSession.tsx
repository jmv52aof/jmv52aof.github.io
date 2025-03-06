import { ChargingSessionDto } from "@common/types/chargingSessions"
import Button from '@components/ui/button/Button'
import ChargingSessionInfo from '@features/chargingSessionInfo/ChargingSessionInfo'
import styles from './styles.module.scss'
import ChargingSessionActivePower from "@components/chargingSessionActivePower/ChargingSessionActivePower"

interface Props {
    chargingSession: ChargingSessionDto    
}

export default function ChargingSession(props: Props): React.JSX.Element {

    const onComplete = () => {
        //TODO
    }
    
    return (
        <>
            <ChargingSessionActivePower charged={props.chargingSession.charged_kwh} />
            <div className={styles.buttonBlock}>
                <Button variant='fill' onClick={onComplete} text='Завершить'/>
            </div>
            <ChargingSessionInfo chargingSession={props.chargingSession}/>
        </>
    )
}