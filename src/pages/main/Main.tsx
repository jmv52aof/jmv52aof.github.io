import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import commonStyles from '@common/styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'
import Search from '@components/search/Search'
import Button from '@components/ui/button/Button'
import Status from '@components/ui/status/Status'
import tuningImage from '@assets/images/tuning.svg'
import DailyOccupation from '@components/dailyOccupation/DailyOccupation'

/**
 * Главная страница с картой станций
 */
export default function MainPage(): React.JSX.Element {
	const dailyOccupations = [
		{ weekday: 1, occupancy_in_percentage: 20 }, // Понедельник
		{ weekday: 2, occupancy_in_percentage: 40 }, // Вторник
		{ weekday: 3, occupancy_in_percentage: 60 }, // Среда
		{ weekday: 4, occupancy_in_percentage: 80 }, // Четверг
		{ weekday: 5, occupancy_in_percentage: 70 }, // Пятница
		{ weekday: 6, occupancy_in_percentage: 50 }, // Суббота
		{ weekday: 7, occupancy_in_percentage: 30 }, // Воскресенье
	  ];
	return (
		<div className={commonStyles.page}>
			<div className={styles.header}>
				<Search />
				<Button iconSrc={tuningImage} onClick={() => {}} variant='icon' />
				<Status textSize='small' color='green' text='Доступен'/>
				<Status textSize='medium' color='orange' text='Занят'/>
				<Status textSize='medium' color='red' text='Нет соединения'/>
				<Status textSize='large' color='grey' text='Невалидна'/>
			</div>
			<StationsMap />
			<div className={styles.footer}>
				<ControlPanel />
			</div>
			<div>
				<DailyOccupation data={dailyOccupations} chartWidth={400} chartHeight={500}/>
			</div>
		</div>
	)
}
