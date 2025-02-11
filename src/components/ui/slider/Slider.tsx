import { useState } from 'react';
import styles from './styles.module.scss'

interface SliderProps {
	min: number;
	max: number;
	step: number;
	defaultValue: number;
	onChange: (value: number) => void;
}

const initMarkers = (min: number, max: number, step: number) => {
	const result = [];
	for (let i = min; i <= max; i += step) {
		result.push(i);
	}
	return result;
}

/**
 * Горизонтальный ползунок, перемещаемый мышкой вдоль прямой
 */
export default function Slider(props: SliderProps): React.JSX.Element {
	const markers = initMarkers(props.min, props.max, props.step)
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(event.target.value);
		if (props.onChange)
			props.onChange(newValue);
	};

	const sliderMarkers = markers.map(item => {
		return <span>{item}</span>
	})

	return(
		<div className={styles.slider__wrap}>
			<div className={styles.slider}>
				<input 
					type="range"
					min={props.min}
					max={props.max}
					step={props.step}
					defaultValue={props.defaultValue}
					onChange={handleChange}		
				/>
				<div className={styles.slider__markers}>
					{sliderMarkers}
				</div>
			</div>			
		</div>)
}
