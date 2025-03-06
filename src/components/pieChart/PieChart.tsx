import { PieChart as RechartsPieChart, Pie, ResponsiveContainer } from 'recharts';
import styles from './styles.module.scss'
import { CircleColorTemplate } from "./lib/types"
import { COLOR_TEMPLATES_MAP, MAX_ANGLE, MIN_ANGLE, ANIMATION_DURATION } from "./lib/consts"

interface Props {
    colorTemplate: CircleColorTemplate
    value: number
    maxValue: number
    className?: string
}

export default function PieChart(props: Props): React.JSX.Element { 
    return (
        <div className={`${styles.chart} ${props.className}`}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                    <Pie
                        data={[
                            {
                                value: props.maxValue
                            }
                        ]}
                        dataKey='value'
                        fill={COLOR_TEMPLATES_MAP[props.colorTemplate].backgroundColor}
                        animationDuration={0}
                        innerRadius={50}
                        outerRadius={90}
                        stroke='none'
                    />
                    <Pie
                        data={[
                            {
                                value:  props.value / props.maxValue * 100
                            }
                        ]}
                        dataKey='value'
                        fill={COLOR_TEMPLATES_MAP[props.colorTemplate].mainColor}
                        innerRadius={50}
                        animationDuration={ANIMATION_DURATION}
                        outerRadius={90}
                        startAngle={MIN_ANGLE}
                        stroke='none'
                        endAngle={MIN_ANGLE + (MAX_ANGLE - MIN_ANGLE) * props.value / props.maxValue}
                    />
                </RechartsPieChart>
            </ResponsiveContainer>           
        </div>
    )
}