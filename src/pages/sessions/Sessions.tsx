import styles from './styles.module.scss'
import ReturnButton from '@components/ui/returnButton/ReturnButton'
import arrowImage from '@assets/images/arrow-left.svg'
import FiltersButton from '@components/ui/filtersButton/FiltersButton'
import tuningImage from '@assets/images/tuning.svg'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import SessionCard from '@components/sessionCard/SessionCard'

/**
 * Страница с зарядными сессиями
 */
export default function SessiosPage(): React.JSX.Element {
	return (
		<div className={styles.sessionsPage}>
			<div className={styles.sessionsPage__header}>
				<div className={styles.header__content}>
					<ReturnButton onClick={() => {}} iconSrc={arrowImage} />
					<div className={styles.content__tittle}>
						<p className={styles.content__text}>Зарядные сессии</p>
					</div>
					<FiltersButton
						iconSrc={tuningImage}
						onClick={() => {}}
						variant='fill'
					/>
				</div>
			</div>
			<div className={styles.sessionsPage__main}>
				<ContentBlockLayout className={styles.main__sessionCard}>
					<SessionCard
						session={{
							id: '1',
							connector_info: {
								station_id: '1',
								station_name: 'Отель Кукарский двор',
								station_address:
									'г. Киров, ул. Дзержинского, 110',
								evse_uid: '1',
								connector_id: '1',
								standard: 'Type 1',
								format: 'Кабель',
								power_type: 'AC',
							},
							status: 'Завершена',
							charged_kwh: 22.14,
							start_date: {
								year: 2025,
								month: 3,
								day: 10,
								hours: 13,
								minutes: 2,
								seconds: 48,
							},
						}}
					/>
				</ContentBlockLayout>
			</div>
		</div>
	)
}
