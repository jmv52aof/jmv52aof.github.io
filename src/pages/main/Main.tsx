import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import commonStyles from '@common/styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'
import Search from '@components/search/Search'
import Button from '@components/ui/button/Button'
import Switch from '@components/ui/switch/Switch'
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
				<Switch onChange={(enabled) => { }} />	
			</div>
			<StationsMap />
			<div className={styles.footer}>
				<ControlPanel />
			</div>
		</div>
	)
}
