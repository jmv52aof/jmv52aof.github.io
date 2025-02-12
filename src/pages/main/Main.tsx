import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import commonStyles from '@common/styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'
import Search from '@components/search/Search'
import Button from '@components/ui/button/Button'
import Status from '@components/ui/status/Status'
import tuningImage from '@assets/images/tuning.svg'

/**
 * Главная страница с картой станций
 */
export default function MainPage(): React.JSX.Element {
	return (
		<div className={commonStyles.page}>
			<div className={styles.header}>
				<Search />
				<Button iconSrc={tuningImage} onClick={() => {}} variant='icon' />
				<Status textSize={10} color='green' text='Доступен'/>
				<Status textSize={12} color='orange' text='Занят'/>
				<Status textSize={12} color='red' text='Нет соединения'/>
				<Status textSize={14} color='grey' text='Невалидна'/>
			</div>
			<StationsMap />
			<div className={styles.footer}>
				<ControlPanel />
			</div>
		</div>
	)
}
