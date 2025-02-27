import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import commonStyles from '@common/styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'
import Button from '@components/ui/button/Button'
import Switch from '@components/ui/switch/Switch'
import Status from '@components/ui/status/Status'
import CustomCarousel from '@components/ui/carousel/Carousel'
import StationPhotos from '@features/stationPhotos/StationPhotos'
import tuningImage from '@assets/images/tuning.svg'

import station1 from "../../assets/images/station/station1.png";
import station2 from "../../assets/images/station/station2.png";
import station3 from "../../assets/images/station/station3.png";


/**
 * Главная страница с картой станций
*/
export default function MainPage(): React.JSX.Element {
	
	const images = [station1, station2, station3];
	
	return (
		<div className={commonStyles.page}>
			<div className={styles.header}>
				<Button iconSrc={tuningImage} onClick={() => {}} variant='icon' />
				<Switch onChange={enabled => {}} />
				<Status textSize='small' color='green' text='Доступен' />
				<Status textSize='medium' color='orange' text='Занят' />
				<Status textSize='medium' color='red' text='Нет соединения' />
				<Status textSize='large' color='grey' text='Невалидна' />
			</div>
			<StationsMap />
			<div className={styles.footer}>
				<ControlPanel />
			</div>
		</div>
	)
}
