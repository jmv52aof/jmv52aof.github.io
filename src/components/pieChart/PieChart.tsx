import { PieChart as MaterialPieChart } from "@mui/x-charts/PieChart"
import styles from './styles.module.scss'
import { CircleColorTemplate } from "./lib/types"
import { COLOR_TEMPLATES_MAP, MAX_ANGLE, MIN_ANGLE, ANIMATION_TIME } from "./lib/consts"
import { useEffect, useState } from "react"

interface Props {
    colorTemplate: CircleColorTemplate
    value: number
    maxValue: number
    className?: string
}

export default function PieChart(props: Props): React.JSX.Element {
    const [endAngle, setEndAngle] = useState<number>(MIN_ANGLE)
    
    useEffect(() => {
        const finalEndAngle = MIN_ANGLE + (MAX_ANGLE - MIN_ANGLE) * props.value / props.maxValue
        const startTime = Date.now()

        const updateAngle = () => {
            const elapsedTime = Date.now() - startTime
            //Ограничение времени в 1 секунду
            const progress = Math.min(elapsedTime / ANIMATION_TIME, 1)
            setEndAngle(MIN_ANGLE + (finalEndAngle - MIN_ANGLE) * progress)

            if (progress < 1) {
                setTimeout(updateAngle, 16); // ~60 FPS (1000ms / 60 ≈ 16ms)
            }
        }

        updateAngle()
    }, [props.value, props.maxValue])

    const value =  props.value / props.maxValue * 100

    return (
        <div className={`${styles.chart} ${props.className}`}>
            <MaterialPieChart
                className={styles.chart__fonPie}
                colors={[COLOR_TEMPLATES_MAP[props.colorTemplate].fonColor]}
                series={[
                    {
                        data: [
                            {id: props.maxValue, value: props.maxValue}
                        ],
                        innerRadius: 50,
                        outerRadius: 90,
                    }
            ]}/>
            <MaterialPieChart 
                className={styles.chart__mainPie}
                skipAnimation={true}
                colors={[COLOR_TEMPLATES_MAP[props.colorTemplate].mainColor]}                
                series={[
                    {
                        data: [
                            {id: props.value, value: value},
                        ],

                        innerRadius: 50,
                        outerRadius: 90,
                        startAngle: MIN_ANGLE,
                        endAngle: endAngle
                    }
                ]}
                />
        </div>
    )
}