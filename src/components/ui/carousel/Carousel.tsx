import { useState } from "react";
import styles from './styles.module.scss'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type Props = {
	imageSources: string[];
}

/**
 * Карусель с фотографиями
 */
export default function CustomCarousel(props: Props): React.JSX.Element {

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };
    
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev < props.imageSources.length - 1 ? prev + 1 : prev));
    };
    
    const responsive = {
        mobile: {
            breakpoint: { max: 3000, min: 0 },
            partialVisibilityGutter: 0,
            items: 1
        }
    };
  
    return (
        <Carousel 
        responsive={responsive}
        infinite={false}
        autoPlay={false}
        arrows={true}
        showDots={true}
        swipeable={true}
        draggable={true}
        containerClass={styles.carousel}
        itemClass={styles.carousel_item}
        beforeChange={(nextSlide) => {
            window.getSelection()?.removeAllRanges();
        }}      
        >
            {props.imageSources.map((src, index) => (
            <img 
            key={index} 
            src={src} 
            alt={`Slide ${index}`} 
            className={styles.carousel_image} 
            draggable={false} // 
            onDragStart={(e) => e.preventDefault()} // 
            />
            ))}
        </Carousel>
    );
}
