import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import styles from '../styles/connector.module.scss'
import { ConnectorInfoDto } from '@common/types/stations'
import { ConnectorTariffDto } from '@common/types/tariffs'
import { CONNECTOR_HAS_ICON } from '@common/consts/stations'
import squareShareLineIcon from '@assets/images/square-share-line.svg'
import walletIcon from '@assets/images/wallet.svg'
import Button from '@components/ui/button/Button'
import { TARIFF_TYPE_HAS_UNIT_OF_MEASUREMENT } from '@common/consts/tariffs'

interface Props {
	connectorInfo: ConnectorInfoDto
	tariffs?: ConnectorTariffDto[]
}

export default function ChargingSessionConnectorInfo(
	props: Props
): React.JSX.Element {
	const onClick = () => {
		//TODO
	}

	return (
		<ContentBlockLayout className={styles.content}>
			<div className={styles.content__connector}>
				<img
					className={styles.connector__icon}
					src={CONNECTOR_HAS_ICON[props.connectorInfo.standard]}
					alt={props.connectorInfo.standard}
				/>
				<p className={styles.connector__type}>{props.connectorInfo.standard}</p>
			</div>
			<div className={styles.content__details}>
				<div className={styles.details__station}>
					<div className={styles.station__info}>
						<p className={styles.info__name}>
							{props.connectorInfo.station_name}
						</p>
						<p className={styles.info__address}>
							{props.connectorInfo.station_address}
						</p>
					</div>
					<Button
						variant='icon'
						onClick={onClick}
						iconSrc={squareShareLineIcon}
					/>
				</div>
				<div className={styles.details__tariffs}>
					<p className={styles.tariffs__title}>
						<img src={walletIcon} /> Используемые тарифы:
					</p>
					<div className={styles.tariffs__data}>
						{props.tariffs?.map((item, index) => {
							return (
								<p key={index} className={styles.data__item}>{`${item.price} ${
									item.currency
								}/${TARIFF_TYPE_HAS_UNIT_OF_MEASUREMENT[item.type]}`}</p>
							)
						})}
					</div>
				</div>
			</div>
		</ContentBlockLayout>
	)
}
