import styles from './styles.module.scss'
import commonStyles from '@common/styles.module.scss'
import Switch from '@components/ui/switch/Switch'
import arrowImage from '@assets/images/arrow.svg'

/**
 * Страница с фильтрами
 */
export default function FiltesrPage(): React.JSX.Element {
	return (
		<div className={commonStyles.page}>
			<div className={styles.header}>
				<Switch onChange={(enabled) => { }} />	
                <img src={arrowImage} alt='arrow' />
			</div>
		</div>
	)
}