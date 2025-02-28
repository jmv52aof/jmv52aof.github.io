import Status from '@components/ui/status/Status';
import CustomCarousel from '@components/ui/carousel/Carousel';
import styles from './styles.module.scss'
import { StationStatus } from '@common/types/stations';
import { STATION_STATUS_COLORS } from '@common/consts/station';
import ratingImage from '@assets/images/ratingStar.svg'

type Props = {
	imageSources: string[];
    stationStatus: StationStatus;
    rating?: number;
}

/**
 * Блок с отображением карусели фотографий, статусом и рейтингом
 */
export default function StationPhotos(props: Props): React.JSX.Element {

    const statusColor = STATION_STATUS_COLORS[props.stationStatus];

    return (
        <div className={styles.photos}>
            <div className={styles.photos__infoBar}>
                <div className={styles.infoBar__substrate}>
                    <Status textSize='large' text={props.stationStatus} className={styles.substrate__customStatus} color={statusColor}/>
                </div>
                {props.rating && (
                    <div className={styles.infoBar__customRating}>
                        <img src={ratingImage} alt='Rating'/>
                        <p className={styles.customRating__text}> {props.rating}</p>
                    </div>
                )}
            </div>
            <CustomCarousel imageSources={props.imageSources}/>
        </div>
    );
}