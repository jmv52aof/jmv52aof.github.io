import { DailyOccupationDto } from '@common/types/stations'
import styles from './styles.module.scss'
import { JSX, useEffect, useRef, useState } from 'react'
import { ChartState } from './lib/types'
import * as consts from './lib/consts'
import { fillData, generateHexColorByPercentage } from './lib/functions'
import { Colors, ColumnRadii } from './lib/consts'
import { DAYS_IN_WEEK } from '@common/consts/date'

interface Props {
    data: DailyOccupationDto[]
}

export default function DailyOccupation(props: Props): React.JSX.Element {    
    const chartBlock = useRef<HTMLDivElement  | null>(null)
    const [chartState, setChartState] = useState<ChartState>({} as ChartState)
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const marginRight = 6
    //Расстояние от левого края до линии/колонки
    const marginLeft = 25
    const textAnchor = "middle"
    const filledData = props.data.length < 7 ? fillData(props.data) : props.data

    useEffect(() => {
        if (chartBlock.current !== null) {
            const clientWidth = chartBlock.current.clientWidth
            const width = clientWidth - marginRight - marginLeft
            const distanceBetweenColums = (width - (consts.COLUMN_WIDTH * DAYS_IN_WEEK)) / (DAYS_IN_WEEK - 1)
            setChartState({
                clientWidth: clientWidth,
                width: width,
                distanceBetweenColums: distanceBetweenColums
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
        for (let y = consts.PADDING_TOP, i = 4; y <= consts.HEIGHT + consts.PADDING_TOP, i >= 0; y += consts.GAP_BEETWEEN_LINES, i--) {
            result.push(
                <text key={i} x={marginLeft / 2} y={y + consts.PADDING_TOP / 2}
                    textAnchor={textAnchor} className={styles.chart__procentage}>
                    {25 * i}%
                </text>
            )
            if (i !== 0) {
                // marginLeft + i, для того чтоб был промежуток между линией и процентов
                result.push(
                    <line key={y} x1={marginLeft + i} y1={y} x2={chartState.clientWidth} y2={y}
                        stroke={Colors.LINE_STROKE_COLOR} 
                        strokeWidth={consts.LINE_STROKE_WIDTH} strokeDasharray={consts.LINE_STROKE_DASHARRAY} />
                )
            }
                
        }
        return result
    }

	return (
        <div className={styles.block} ref={chartBlock}>
            <svg className={styles.block__chart}>
                {generateDottedLines()}
                {filledData.map((item, index) => {
                    const x = marginLeft + index * (consts.COLUMN_WIDTH + chartState.distanceBetweenColums);             
                    let heightColumn = 0
                    const color = item.occupancy_in_percentage === 0 
                        ? Colors.INACTIVE_COLUMN_COLOR
                        : generateHexColorByPercentage(item.occupancy_in_percentage)                 
                    if (item.occupancy_in_percentage < consts.MIN_PERCENTAGE) {                            
                        heightColumn = consts.MIN_HEIGHT_COLUMN
                    } else {
                        heightColumn = item.occupancy_in_percentage * consts.HEIGHT / 100;
                    }
                    const y = consts.HEIGHT + consts.PADDING_TOP - heightColumn;
                    
                    return (
                        <g key={index}>
                        <rect
                            x={x}
                            y={y}
                            rx={heightColumn >= consts.MAX_COLUMN_HEIGHT_WITH_SMALL_RADIUS 
                                ? ColumnRadii.NORMAL 
                                : ColumnRadii.SMALL}
                            fill={color}
                            width={consts.COLUMN_WIDTH}
                            height={heightColumn}
                        />
                        <text x={x + consts.COLUMN_WIDTH / 2} y={y + heightColumn + consts.BOTTOM_AND_COLUMN_DISTANCE} 
                            textAnchor={textAnchor} className={styles.chart__text}>
                            {consts.WEEKDAY_HAS_READABLE_DAY[item.weekday]}
                        </text>
                        </g>
                    );
                })}               
            </svg>
        </div>)
}
