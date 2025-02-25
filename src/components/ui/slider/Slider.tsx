import styles from './styles.module.scss'
import { JSX, useState } from 'react';

interface SliderProps {
	values: number[]
	step: number
	formatValue: (value: number, index: number) => string
	onChange: (value: string) => void;
}

/**
 * Горизонтальный ползунок, перемещаемый мышкой вдоль прямой
 */
export default function Slider(props: SliderProps): React.JSX.Element {
	if (!props.values.length) {
		throw new Error('Values length must be >=2')
	}
	const [disabled, setDisabled] = useState<boolean>(false)
	const handleChange = (value: string) => {
		console.log(value)
		props.onChange(value)
	}
	const min = props.values[0]
	const max = props.values[props.values.length - 1]
	let valIdx = 0
	const markers: JSX.Element[] = []
	
	for (let i = min; i <= max; i += props.step) {
		if (props.values[valIdx] === i) {
			markers.push(<span key={i} style={{'color': disabled ? '#C8CED8' : '#373435'}}>{props.formatValue(props.values[valIdx], valIdx)}</span>)
			valIdx++;
		} else {
			markers.push(<span key={i}> </span>)
		}
	}
	return(
		<div className={styles.slider}>
			<div className={styles.slider__wrapper}>
				<input 
					disabled={disabled}
					type="range"
					min={min}
					max={max}
					className={styles.wrapper__range}
					step={props.step}					
					onChange={(event) => handleChange(event.target.value)}		
				/>
				<div className={styles.wrapper__markers}>
					{markers}
				</div>
			</div>			
		</div>)
}
