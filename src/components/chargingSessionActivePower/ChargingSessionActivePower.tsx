import PieChart from '@components/pieChart/PieChart'
import styles from './styles.module.scss'
import lightingIcon from '@assets/images/lighting-fill-blue.svg'

interface Props {
    charged: number
    batteryPercentage: number
}

export default function ChargingSessionActivePower(props: Props): React.JSX.Element {

    return (
        <div className={styles.power}>
            <div className={styles.power__content}>               
                <img className={styles.content__icon } src={lightingIcon}/>
                {props.charged !== 0 && 
                    <span className={styles.content__text}>
                    {props.charged} кВт</span>}       
            </div>
            <PieChart 
                value={props.charged} 
                maxValue={props.batteryPercentage === 0
                    ? 0
                    : props.charged / (props.batteryPercentage / 100)
                } 
                colorTemplate='blue' 
                className={styles.power__pieChart}/>                        

        </div>       
    )
}