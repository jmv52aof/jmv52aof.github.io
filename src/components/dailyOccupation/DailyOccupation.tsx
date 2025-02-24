import { DailyOccupationDto } from '@common/types/stations'
import styles from './styles.module.scss'
import { JSX, useEffect, useRef, useState } from 'react'
import { ChartState } from './lib/types'
import { BAR_PLOT_WIDTH, MAX_BLUE, MAX_GREEN, MIN_BLUE, MIN_GREEN, PADDING_BOTTOM, PADDING_TOP, weekDayNamesMap } from './lib/consts'

interface Props {
    data: DailyOccupationDto[]
}

export default function DailyOccupation(props: Props): React.JSX.Element {
    const chartBlock = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<ChartState>({} as ChartState)
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    useEffect(() => {
        if (chartBlock.current !== null) {
            const clientWidth = chartBlock.current.clientWidth ?? 0
            const clientHeight = chartBlock.current.clientHeight ?? 0
            const marginX = BAR_PLOT_WIDTH
            const width = clientWidth - marginX * 2
            const sidePadding = (width - (BAR_PLOT_WIDTH * props.data.length)) / (props.data.length - 1)
            setState({
                clientHeight: clientHeight,
                clientWidth: clientWidth,
                width: width,
                height: clientHeight - PADDING_TOP -  PADDING_BOTTOM * 2,
                marginX: marginX,
                marginTop: PADDING_TOP,
                marginBottom: PADDING_BOTTOM,
                sidePadding: sidePadding
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
        const gap = Math.floor(state.height / 4)
        for (let i = state.marginTop; i <= state.height; i += gap) {
            result.push(
                <line key={i} x1={state.marginX / 2} y1={i} x2={state.clientWidth - state.marginX / 2} y2={i} stroke="#E8E8EE" 
                    strokeWidth="2" strokeDasharray="15" />)
        }
        return result
    }

	return (
        <div className={styles.block}>
            <h2 className={styles.block__title}>График загруженности</h2>
            <div className={styles.block__chart} ref={chartBlock}>
                <svg className={styles.chart}>
                    {generateDottedLines()}
                    {props.data.map((item, index) => {
                        const x = state.marginX + index * (BAR_PLOT_WIDTH + state.sidePadding);  
                        let y = 0                   
                        let heightBar = 0
                        let color: string                
                        if (item.occupancy_in_percentage <= 0) {
                            color = '#C8CED8'
                            heightBar = 5
                            y = state.height + state.marginTop - heightBar
                        } else {
                            y = state.height + state.marginTop - item.occupancy_in_percentage * state.height / 100;
                            heightBar = item.occupancy_in_percentage * state.height / 100;
                            const g = Math.round(MIN_GREEN - (item.occupancy_in_percentage / 100) * (MIN_GREEN - MAX_GREEN));
                            const b = Math.round(MIN_BLUE - (item.occupancy_in_percentage / 100) * (MIN_BLUE - MAX_BLUE));
                            color = `#00${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
                        }
                       
                        return (
                            <g key={index}>
                              <rect
                                x={x}
                                y={y}
                                rx={5}
                                fill={color}
                                width={BAR_PLOT_WIDTH}
                                height={heightBar}
                              />
                              <text x={x + BAR_PLOT_WIDTH / 2} y={y + heightBar + state.marginBottom} 
                                textAnchor="middle" className={styles.chart__text}>
                                {weekDayNamesMap.get(item.weekday)}
                              </text>
                            </g>
                          );
                    })}
                </svg>
            </div>
        </div>)
}