import { DailyOccupationDto } from '@common/types/stations'
import styles from './styles.module.scss'
import { JSX, useEffect, useRef, useState } from 'react'
import { ChartState } from './lib/types'
import { BAR_PLOT_WIDTH, BAR_RADIUS, COUNT_DAYS_IN_WEEK, GAP_BEETWEEN_LINES, HEIGHT, 
    HEIGHT_BAR_WITH_SMALL_BAR_RADIUS, 
    INACTIVE_COLUMN_COLOR, LINE_STROKE_COLOR, LINE_STROKE_DASHARRAY, LINE_STROKE_WIDTH,
    MIN_HEIGHT_BAR, MIN_PERCENTAGE, PADDING_BOTTOM, PADDING_TOP, SMALL_BAR_RADIUS, TEXT_ANCHOR, WEEK_DAY_NAMES_MAP 
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
            const distanceBetweenBars = (width - (BAR_PLOT_WIDTH * COUNT_DAYS_IN_WEEK)) / (COUNT_DAYS_IN_WEEK - 1)
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

    
    const generateChartBars = () => {
        const result: JSX.Element[] = []
        let dataIdx = 0
        for (let i = 1; i <= COUNT_DAYS_IN_WEEK; i++) {
            let percentage = 0
            if (dataIdx < props.data.length && props.data[dataIdx].weekday === i) {
                percentage = props.data[dataIdx].occupancy_in_percentage
                dataIdx++
            }
            const x = marginX + (i - 1) * (BAR_PLOT_WIDTH + chartState.distanceBetweenBars);  
            let y = 0                   
            let heightBar = 0
            if (percentage < MIN_PERCENTAGE) {                            
                heightBar = MIN_HEIGHT_BAR
                y = HEIGHT + PADDING_TOP - heightBar
            } else {
                y = HEIGHT + PADDING_TOP - percentage * HEIGHT / 100;
                heightBar = percentage * HEIGHT / 100;
            }

            result.push (<g key={i}>
                            <rect
                                x={x}
                                y={y}
                                rx={heightBar >= HEIGHT_BAR_WITH_SMALL_BAR_RADIUS 
                                        ? BAR_RADIUS 
                                        : SMALL_BAR_RADIUS}
                                fill={percentage === 0 
                                        ? INACTIVE_COLUMN_COLOR
                                        : generateColorByPercentage(percentage)}
                                width={BAR_PLOT_WIDTH}
                                height={heightBar}
                            />
                            <text x={x + BAR_PLOT_WIDTH / 2} y={y + heightBar + PADDING_BOTTOM} 
                                textAnchor={TEXT_ANCHOR} className={styles.chart__text}>
                                {WEEK_DAY_NAMES_MAP[i]}
                            </text>
                        </g>);
        }
        return result
    }

	return (
        <div className={styles.block} ref={chartBlock}>
            <svg className={styles.block__chart}>
                {generateDottedLines()}
                {generateChartBars()}               
            </svg>
        </div>)
}
