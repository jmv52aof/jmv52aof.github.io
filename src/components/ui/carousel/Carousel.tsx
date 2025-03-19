import styles from './styles.module.scss'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

type Props = {
	imageSources: string[]
}

/**
 * Карусель с фотографиями
 */
export default function CustomCarousel(props: Props): React.JSX.Element {
	const responsive = {
		mobile: {
			breakpoint: { max: 3000, min: 0 },
			partialVisibilityGutter: 0,
			items: 1,
		},
	}

	const shouldShowDots = props.imageSources.length > 1

	return (
		<Carousel
			responsive={responsive}
			infinite={false}
			autoPlay={false}
			arrows={true}
			showDots={shouldShowDots}
			swipeable={true}
			draggable={true}
			containerClass={styles.carousel}
			itemClass={styles.carousel__item}
			beforeChange={_ => {
				window.getSelection()?.removeAllRanges()
			}}
		>
			{props.imageSources.map((src, index) => (
				<img
					key={index}
					src={src}
					alt={`Slide ${index}`}
					className={styles.item__image}
					draggable={false}
					onDragStart={e => e.preventDefault()}
				/>
			))}
		</Carousel>
	)
}
