import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import commonStyles from '@common/styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'

/**
 * Главная страница с картой станций
 */
export default function MainPage(): React.JSX.Element {
	return (
		<div className={commonStyles.page}>
			<div className={styles.header}></div>
			<StationsMap />
			<div className={styles.footer}>
				<ControlPanel />
			</div>
		</div>
	)
}
