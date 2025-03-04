import styles from "../../styles/connector.module.scss"
import Status from '@components/ui/status/Status'
import { CONNECTOR_HAS_ICON, CONNECTOR_STATUS_COLORS } from "@common/consts/stations"
import { ConnectorDto } from "@common/types/stations"

type Props = {
    connector: ConnectorDto;
    isLast: boolean;
};

export default function Connector({ connector, isLast }: Props) {
    return (
        <div className={styles.connectorsList__connector}>
            <div className={styles.connector__wrap}>
                <div className={styles.connector__icon}>
                    <img src={CONNECTOR_HAS_ICON[connector.standard]} alt={connector.standard} />
                </div>
                <div className={styles.connector__content}>
                    <div className={styles.content__firstColumn}>
                        <p className={styles.firstColumn__text1}>{connector.standard}</p>
                        <p className={styles.firstColumn__text2}>{connector.max_electric_power} кВт</p>
                    </div>
                    <div className={styles.content__secondColumn}>
                        <div className={styles.secondColumn__veticalSplit}>
                            <div className={styles.rectangleV}></div>
                        </div>
                        <div className={styles.secondColumn__status}>
                            <Status textSize="small" text={connector.status} color={CONNECTOR_STATUS_COLORS[connector.status]} />
                        </div>
                    </div>
                </div>
            </div>
            {!isLast && (
                <div className={styles.connector__horizontalSplit}>
                    <div className={styles.rectangleH}></div>
                </div>
            )}
        </div>
    );
}