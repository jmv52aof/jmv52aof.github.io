import { DailyOccupationDto } from '@common/types/stations'
import styles from './styles.module.scss'
import { JSX, useEffect, useRef, useState } from 'react'
import { ChartState, weekDayNamesMap } from './lib/utils'

interface Props {
    data: DailyOccupationDto[]
    barPlotWidth: number
    sidePadding: number
    paddingTop: number
    paddingBottom: number
}

DailyOccupation.defaultProps = {
    data: [],
    barPlotWidth: 25,
    sidePadding: 15,
    paddingTop: 10,
    paddingBottom: 25,
}

export function DailyOccupation({data, barPlotWidth = 25, sidePadding = 15, paddingBottom = 25, paddingTop = 10}: Props): React.JSX.Element {
    const chartBlock = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<ChartState>({} as ChartState)
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        if (chartBlock.current !== null) {
            const clientWidth = chartBlock.current.clientWidth ?? 0
            const clientHeight = chartBlock.current.clientHeight ?? 0
            const marginX = (clientWidth - (barPlotWidth + sidePadding) * 7) / 2
            const marginTop = 10
            const marginBottom = 25
            setState({
                clientHeight: clientHeight,
                clientWidth: clientWidth,
                width: clientWidth - marginX * 2,
                height: clientHeight - marginTop -  marginBottom,
                marginX: marginX,
                marginTop: paddingTop,
                marginBottom: paddingBottom
            })
        }        
    }, [chartBlock, windowSize])

    useEffect(() => {
      const resizeHandler = () => setWindowSize([window.innerWidth, window.innerHeight]);
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    const color = '#0000ff'
    const generateDottedLines = () => {        
        const result: JSX.Element[] = []
        const gap = Math.floor(state.height / 4)
        for (let i = state.marginTop; i <= state.height; i += gap) {
            result.push(
                <line key={i} x1={sidePadding} y1={i} x2={state.clientWidth - sidePadding} y2={i} stroke="#E8E8EE" 
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
                    {data.map((item, index) => {                
                        const x = state.marginX + index * (barPlotWidth + sidePadding);                                            
                        const y = state.height - item.occupancy_in_percentage * state.height / 100;
                        const heightBar = item.occupancy_in_percentage * state.height / 100;
                        let r = parseInt(color.substring(1, 3), 16);
                        let g = parseInt(color.substring(3, 5), 16);
                        let b = parseInt(color.substring(5, 7), 16);
                        r = Math.round(255 - (255 - r) * (item.occupancy_in_percentage / 100));
                        g = Math.round(255 - (255 - g) * (item.occupancy_in_percentage / 100));
                        b = Math.round(255 - (255 - b) * (item.occupancy_in_percentage / 100));
                        const toHex = (c: number) => {
                            const hex = c.toString(16);
                            return hex.length === 1 ? '0' + hex : hex;
                        }
                        return (
                            <g key={index}>
                              <rect
                                x={x}
                                y={y}
                                rx={10}
                                fill={`#${toHex(r)}${toHex(g)}${toHex(b)}`}
                                width={barPlotWidth}
                                height={heightBar}
                              />
                              <text x={x + barPlotWidth / 2} y={y + heightBar + state.marginBottom} 
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