import { DailyOccupationDto } from '@common/types/stations'
import styles from './styles.module.scss'
import { JSX } from 'react'

interface Props {
    data: DailyOccupationDto[]
    chartWidth: number
    chartHeight: number
}

const weekDayNamesMap = new Map<number, string>([
    [1, 'ПН'],
    [2, 'ВТ'],
    [3, 'СР'],
    [4, 'ЧТ'],
    [5, 'ПТ'],
    [6, 'СБ'],
    [7, 'ВС'],
])


export default function DailyOccupation({data, chartHeight, chartWidth}: Props): React.JSX.Element {
    const margin = 30
    const width = chartWidth - margin * 2
    const height = chartHeight - margin * 2  
    const barPlotWidth = width / data.length;
    const sidePadding = 10
    const textPadding = 25
    const color = '#0000ff'
    const generateDottedLines = () => {        
        const result: JSX.Element[] = []
        const gap = Math.floor(height / 4)
        for (let i = margin; i <= height; i += gap) {
            result.push(
                <line key={i} x1={sidePadding} y1={i} x2={chartWidth - sidePadding} y2={i} stroke="#E8E8EE" 
                    stroke-width="2" stroke-dasharray="15" />)
        }
        return result
    }

	return (
        <div className={styles.block}>
            <h2 className={styles.block__title}>График загруженности</h2>
            <div className={styles.block__chart}>
                <svg width={chartWidth} height={chartHeight} className={styles.chart}>
                    {generateDottedLines()}
                    {data.map((item, index) => {                    
                        const x = margin + index * barPlotWidth;                                            
                        const y = height - item.occupancy_in_percentage * height / 100;
                        const heightBar = item.occupancy_in_percentage * height / 100;
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
                                x={x + sidePadding / 2}
                                y={y}
                                rx={10}
                                fill={`#${toHex(r)}${toHex(g)}${toHex(b)}`}
                                width={barPlotWidth - sidePadding}
                                height={heightBar}
                              />
                              <text x={x + barPlotWidth / 2} y={y + heightBar + textPadding} textAnchor="middle">
                                {weekDayNamesMap.get(item.weekday)}
                              </text>
                            </g>
                          );
                    })}
                </svg>
            </div>
        </div>)
}