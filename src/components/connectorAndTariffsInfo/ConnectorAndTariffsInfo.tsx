import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import styles from './styles.module.scss'
import { ConnectorInfoDto } from '@common/types/stations'
import { ConnectorTariffDto } from '@common/types/tariffs'
import { CONNECTOR_HAS_ICON } from '@common/consts/stations'
import squareShareLineIcon from '@assets/images/square-share-line.svg'
import walletIcon from '@assets/images/wallet.svg'
import Button from '@components/ui/button/Button'

interface Props {
    connectorInfo: ConnectorInfoDto
    tariffs?: ConnectorTariffDto[]
    
}

export default function ConnectorAndTariffsInfo(props: Props): React.JSX.Element {
    const onClick = () => {
        //TODO
    }
    
    return (
        <ContentBlockLayout className={styles.content}>
            <div className={styles.content__imgBlock}>
                <img
                    className={styles.imgBlock__img}
                    src={CONNECTOR_HAS_ICON[props.connectorInfo.standard]} 
                    alt={props.connectorInfo.standard} />
                <p className={styles.imgBlock__label}>{props.connectorInfo.standard}</p>
            </div>
            <div className={styles.content__details}>
                <div className={styles.details__connector}>
                    <div className={styles.connector__textBlock}>
                        <p className={styles.textBlock__title}>
                            {props.connectorInfo.station_name}
                        </p>
                        <p className={styles.textBlock__subtitle}>
                            {props.connectorInfo.station_address}
                        </p>
                    </div>
                    <Button variant="icon" onClick={onClick} iconSrc={squareShareLineIcon}/>
                </div>
                <div className={styles.details__tariffs}>
                    <p className={styles.tariffs__title}><img src={walletIcon} /> Используемые тарифы:</p>
                    <p className={styles.tariffs__text}>
                        {props.tariffs?.map(item => `${item.price} ${item.currency}`).join(' ')}
                    </p>
                </div>
            </div>
        </ContentBlockLayout>
    )
}