import styles from './styles.module.scss'
import { initMarkers } from './lib/finction';

interface SliderProps {
	min: number | string;
	max: number | string;
	step: number | string;
	defaultValue: number | string;
	onChange: (value: string) => void;
}

/**
 * Горизонтальный ползунок, перемещаемый мышкой вдоль прямой
 */
export default function Slider(props: SliderProps): React.JSX.Element {
	const markers = initMarkers(Number(props.min), Number(props.max), Number(props.step))
	const handleChange = (value: string) => {
		props.onChange(value)
	}	

	return(
		<div className={styles.slider}>
			<div className={styles.slider__wrapper}>
				<input 
					type="range"
					min={props.min}
					max={props.max}
					className={styles.wrapper__range}
					step={props.step}
					defaultValue={props.defaultValue}
					onChange={(event) => handleChange(event.target.value)}		
				/>
				<div className={styles.wrapper__markers}>
					{markers.map(item => <span key={item}>{item}</span>)}
				</div>
			</div>			
		</div>)
}
