import { DailyOccupationDto } from '@common/types/stations'
import styles from './styles.module.scss'
import { JSX, useEffect, useMemo, useRef, useState } from 'react'
import { ChartState } from './lib/types'
import * as consts from './lib/consts'
import { fillData, generateHexColorByPercentage } from './lib/functions'
import { Colors, ColumnRadii, Distances } from './lib/consts'
import { DAYS_IN_WEEK } from '@common/consts/date'

interface Props {
    data: DailyOccupationDto[]
}

export default function DailyOccupation(props: Props): React.JSX.Element {    
    const chartBlock = useRef<HTMLDivElement  | null>(null)
    const [chartState, setChartState] = useState<ChartState>({} as ChartState)
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const textAnchor = "middle"    
    const filledData = useMemo(() => { 
        const sortedData = props.data.sort((a, b) => {
            if (a.weekday > b.weekday) {
                return 1;
            }
            if (a.weekday < b.weekday) {
                return -1;
            }
            return 0;
        })
        return props.data.length < 7 ? fillData(sortedData) : sortedData
    }, [props.data])

    useEffect(() => {
        if (chartBlock.current !== null) {
            const clientWidth = chartBlock.current.clientWidth
            const width = clientWidth - Distances.RIGHT_AND_COLUMN_DISTANCE - Distances.LEFT_AND_COLUMN_DISTANCE
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
        for (let y = Distances.TOP_AND_COLUMN_DISTANCE, i = 4; y <= consts.HEIGHT + Distances.TOP_AND_COLUMN_DISTANCE, i >= 0; y += consts.GAP_BEETWEEN_LINES, i--) {
            result.push(
                <text key={i} x={Distances.LEFT_AND_COLUMN_DISTANCE / 2} y={y + Distances.TOP_AND_COLUMN_DISTANCE / 2}
                    textAnchor={textAnchor} className={styles.chart__procentage}>
                    {25 * i}%
                </text>
            )
            if (i !== 0) {
                // marginLeft + i, для того чтоб был промежуток между линией и процентов
                result.push(
                    <line key={y} x1={Distances.LEFT_AND_COLUMN_DISTANCE + i} y1={y} x2={chartState.clientWidth} y2={y}
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
                    const x = Distances.LEFT_AND_COLUMN_DISTANCE + index * (consts.COLUMN_WIDTH + chartState.distanceBetweenColums);             
                    const heightColumn = item.occupancy_in_percentage < consts.MIN_PERCENTAGE 
                        ? consts.MIN_HEIGHT_COLUMN
                        : item.occupancy_in_percentage * consts.HEIGHT / 100                                                       
                    const y = consts.HEIGHT + Distances.TOP_AND_COLUMN_DISTANCE - heightColumn;                    
                    return (
                        <g key={index}>
                        <rect
                            x={x}
                            y={y}
                            rx={heightColumn >= consts.MAX_COLUMN_HEIGHT_WITH_SMALL_RADIUS 
                                ? ColumnRadii.NORMAL 
                                : ColumnRadii.SMALL}
                            fill={item.occupancy_in_percentage === 0 
                                ? Colors.INACTIVE_COLUMN_COLOR
                                : generateHexColorByPercentage(item.occupancy_in_percentage)
                            }
                            width={consts.COLUMN_WIDTH}
                            height={heightColumn}
                        />
                        <text x={x + consts.COLUMN_WIDTH / 2} 
                            y={y + heightColumn + Distances.BOTTOM_AND_COLUMN_DISTANCE - Distances.BOTTOM_AND_TEXT_DISTANCE} 
                            textAnchor={textAnchor} className={styles.chart__text}>
                            {consts.WEEKDAY_HAS_READABLE_DAY[item.weekday]}
                        </text>
                        </g>
                    );
                })}               
            </svg>
        </div>)
}
