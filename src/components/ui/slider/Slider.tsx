import React, {useState, useRef, useEffect} from 'react';
import styles from './styles.module.scss';

interface Props {
  items: {[key: number | string]: any};
  onChange: (value: any) => void;
}

const Slider: React.FC<Props> = ({items, onChange}) => {
	const [pointOffset, setPointOffset] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);
	const keys = Object.keys(items);
	
	let selectedIndex = 0;
  
	const handleMouseDown = (event: React.MouseEvent) => {
		setIsDragging(true);
		updateSliderPosition(event.clientX);
	};
  
	const handleMouseMove = (event: MouseEvent) => {
		if (isDragging) {
			updateSliderPosition(event.clientX);
		}
	};
  
	const handleMouseUp = () => {
		if (isDragging) {
			setIsDragging(false);
			snapToNearestValue();
			onChange(items[keys[selectedIndex]]);
		}
	};
  
	const updateSliderPosition = (clientX: number) => {
		if (sliderRef.current) {
			const rect = sliderRef.current.getBoundingClientRect();
			const offsetX = clientX - rect.left;
			const width = rect.width;
			const newIndex = Math.round((offsetX / width) * (keys.length - 1));

			selectedIndex = Math.max(0, Math.min(keys.length - 1, newIndex));

			let normalizedOffset = offsetX;
			if (normalizedOffset < 0) {
				normalizedOffset = 0;
			}
			else if (normalizedOffset > width) {
				normalizedOffset = width;
			}
			
			setPointOffset(normalizedOffset / width * 100);
		}
	};
  
	const snapToNearestValue = () => {
		if (sliderRef.current) {
			setPointOffset((selectedIndex / (keys.length - 1)) * 100);
		}
	};
  
	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging]);
  
	return (
		<div style={{width: '100%', padding: '20px 0'}}>
			<div
				ref={sliderRef}
				className={styles.slider}
				onMouseDown={handleMouseDown}
			>
				
			<div
				className={styles.slider__pointer}
				style={{
					left: `${pointOffset}%`,
					transform: 'translate(-50%, -50%)',
					transition: isDragging ? '' : 'all 0.5s ease-out',
					borderColor: isDragging ? '#13A69D' : '#C8CED8',
				}}
			/>
			</div>

			<div
				className={styles.slider__legendContainer}
			>
				{keys.map((key, _) => (
					<div
						key={key}
						className={styles.legendContainer__text}
					>
						{key}
					</div>
				))}
			</div>
		</div>
	);
};

export default Slider;