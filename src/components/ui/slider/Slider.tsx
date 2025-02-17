import styles from './styles.module.scss'
import { initMarkers } from './lib/finction';
import { JSX, useState } from 'react';

interface SliderProps {
	valueLst: number[]
	step: number
	generateMarker: (value: number, index: number) => string
	onChange: (value: string) => void;
}

/**
 * Горизонтальный ползунок, перемещаемый мышкой вдоль прямой
 */
export default function Slider(props: SliderProps): React.JSX.Element {
	const [disabled, setDisabled] = useState<boolean>(false)
	const handleChange = (value: string) => {
		props.onChange(value)
	}
	const min = props.valueLst[0]
	const max = props.valueLst[props.valueLst.length - 1]
	let valIdx = 0
	const markers: JSX.Element[] = []
	
	for (let i = min; i <= max; i += props.step) {
		if (props.valueLst[valIdx] === i) {
			markers.push(<span key={i} style={{'color': disabled ? '#C8CED8' : '#373435'}}>{props.generateMarker(props.valueLst[valIdx], valIdx)}</span>)
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
					min={props.valueLst[0]}
					max={props.valueLst[props.valueLst.length - 1]}
					className={styles.wrapper__range}
					step={props.step}					
					onChange={(event) => handleChange(event.target.value)}		
				/>
				<div className={styles.wrapper__markers}>
					{markers.map(item => item)}
				</div>
			</div>			
		</div>)
}
