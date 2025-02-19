import { useState } from "react";
import styles from './styles.module.scss'

type Props = {
	imageSources: string[];
}

/**
 * Карусель с фотографиями
 */
export default function Carousel(props: Props): React.JSX.Element {

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };
    
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev < props.imageSources.length - 1 ? prev + 1 : prev));
    };
    
  
    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {props.imageSources.map((src, index) => (
                    <img key={index} src={src} alt={`Slide ${index}`} className={styles.carouselImage} />
            ))}
            </div>
            {currentIndex > 0 && (
                <button onClick={prevSlide} className={styles.carouselButtonLeft}>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L7 7L1 1" stroke="#373435" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            )}
            {currentIndex < props.imageSources.length - 1 && (
            <button onClick={nextSlide} className={styles.carouselButtonRight}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13L7 7L1 1" stroke="#373435" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            )}
            <div className={styles.indicatorContainer}>
                {props.imageSources.map((_, index) => (
                    <span key={index} className={`${styles.indicator} ${currentIndex === index ? styles.active : ""}`} />
                ))}
            </div>            
        </div>
    );
}