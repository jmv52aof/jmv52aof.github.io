import Status from '@components/ui/status/Status';
import CustomCarousel from '@components/ui/carousel/Carousel';
import styles from './styles.module.scss'

type Props = {
	imageSources: string[];
    statusStation: string;
    rating?: number;
}

/**
 * Блок с отображением карусели фотографий, статусом и рейтингом
 */
export default function StationPhotos(props: Props): React.JSX.Element {

  
    return (
        <div>
            <Status color='green' textSize='small' text='Доступна'/>
            <CustomCarousel imageSources={props.imageSources}/>
        </div>
    );
}