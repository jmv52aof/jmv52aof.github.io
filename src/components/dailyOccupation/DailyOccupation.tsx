import { DailyOccupationDto } from '@common/types/stations'
import styles from './styles.module.scss'
import { JSX, useEffect, useRef, useState } from 'react'
import { ChartState } from './lib/types'
import { BAR_PLOT_WIDTH, BAR_RADIUS, GAP_BEETWEEN_LINES, HEIGHT, 
    INACTIVE_COLUMN_COLOR, LINE_STROKE_COLOR, LINE_STROKE_DASHARRAY, LINE_STROKE_WIDTH,
    MIN_HEIGHT_BAR, MIN_PERCENTAGE, PADDING_BOTTOM, PADDING_TOP, TEXT_ANCHOR, WEEK_DAY_NAMES_MAP 
} from './lib/consts'
import { generateColorByPercentage } from './lib/functions'

interface Props {
    data: DailyOccupationDto[]
}

export default function DailyOccupation(props: Props): React.JSX.Element {
    const chartBlock = useRef<HTMLDivElement>(null)
    const [chartState, setChartState] = useState<ChartState>({} as ChartState)
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const marginX = BAR_PLOT_WIDTH

    useEffect(() => {
        if (chartBlock.current !== null) {
            const clientWidth = chartBlock.current.clientWidth
            const width = clientWidth - marginX * 2
            const distanceBetweenBars = (width - (BAR_PLOT_WIDTH * props.data.length)) / (props.data.length - 1)
            setChartState({
                clientWidth: clientWidth,
                width: width,
                distanceBetweenBars: distanceBetweenBars
            })
        }        
    }, [chartBlock, windowSize])

    useEffect(() => {
      const resizeHandler = () => setWindowSize([window.innerWidth, window.innerHeight]);
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    const generateDottedLines = () => {        
        const result: JSX.Element[] = []
        for (let y = PADDING_TOP; y <= HEIGHT; y += GAP_BEETWEEN_LINES) {
            result.push(
                <line key={y} x1={marginX / 2} y1={y} x2={chartState.clientWidth - marginX / 2} y2={y} stroke={LINE_STROKE_COLOR} 
                    strokeWidth={LINE_STROKE_WIDTH} strokeDasharray={LINE_STROKE_DASHARRAY} />)
        }
        return result
    }

	return (
        <div className={styles.block} ref={chartBlock}>
            <svg className={styles.block__chart}>
                {generateDottedLines()}
                {props.data.map((item, index) => {
                    const x = marginX + index * (BAR_PLOT_WIDTH + chartState.distanceBetweenBars);  
                    let y = 0                   
                    let heightBar = 0
                    const color = item.occupancy_in_percentage === 0 
                        ? INACTIVE_COLUMN_COLOR
                        : generateColorByPercentage(item.occupancy_in_percentage)
                    if (item.occupancy_in_percentage < MIN_PERCENTAGE) {                            
                        heightBar = MIN_HEIGHT_BAR
                        y = HEIGHT + PADDING_TOP - heightBar
                    } else {
                        y = HEIGHT + PADDING_TOP - item.occupancy_in_percentage * HEIGHT / 100;
                        heightBar = item.occupancy_in_percentage * HEIGHT / 100;
                    }
                
                    return (
                        <g key={index}>
                        <rect
                            x={x}
                            y={y}
                            rx={BAR_RADIUS}
                            fill={color}
                            width={BAR_PLOT_WIDTH}
                            height={heightBar}
                        />
                        <text x={x + BAR_PLOT_WIDTH / 2} y={y + heightBar + PADDING_BOTTOM} 
                            textAnchor={TEXT_ANCHOR} className={styles.chart__text}>
                            {WEEK_DAY_NAMES_MAP[item.weekday]}
                        </text>
                        </g>
                    );
                })}
            </svg>
        </div>)
}