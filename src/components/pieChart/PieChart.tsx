import {
	PieChart as RechartsPieChart,
	Pie,
	ResponsiveContainer,
} from 'recharts'
import styles from './styles.module.scss'
import { CircleColorTemplate } from './lib/types'
import {
	COLOR_TEMPLATES_MAP,
	MAX_ANGLE,
	MIN_ANGLE,
	ANIMATION_DURATION_IN_MS,
} from './lib/consts'

interface Props {
	colorTemplate: CircleColorTemplate
	value: number
	maxValue: number
	className?: string
}

export default function PieChart(props: Props): React.JSX.Element {
	let maxValue = props.maxValue
	if (props.value === maxValue) {
		maxValue = 0 === props.value ? 100 : props.value * 100
	}

	return (
		<div className={`${styles.chart} ${props.className}`}>
			<ResponsiveContainer width='100%' height='100%'>
				<RechartsPieChart>
					<Pie
						data={[
							{
								value: maxValue,
							},
						]}
						dataKey='value'
						fill={COLOR_TEMPLATES_MAP[props.colorTemplate].backgroundColor}
						animationDuration={0}
						innerRadius={'55%'}
						outerRadius={'100%'}
						stroke='none'
					/>
					<Pie
						data={[
							{
								value: props.value,
							},
						]}
						dataKey='value'
						fill={COLOR_TEMPLATES_MAP[props.colorTemplate].mainColor}
						innerRadius={'55%'}
						animationDuration={ANIMATION_DURATION_IN_MS}
						outerRadius={'100%'}
						startAngle={MIN_ANGLE}
						stroke='none'
						endAngle={
							MIN_ANGLE +
							((MAX_ANGLE - MIN_ANGLE) * props.value) / props.maxValue
						}
					/>
				</RechartsPieChart>
			</ResponsiveContainer>
		</div>
	)
}
