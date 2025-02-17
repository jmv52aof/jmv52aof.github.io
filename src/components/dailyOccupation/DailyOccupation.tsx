import { DailyOccupationDto } from '@common/types/stations'
import styles from './styles.module.scss'

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
    const MARGIN = 50
    const width = chartWidth - MARGIN * 2
    const height = chartHeight - MARGIN * 2
    const xAxisY = MARGIN + height;
    const dataYMax = data.reduce(
        (currMax, item) => Math.max(currMax, item.occupancy_in_percentage),
        -Infinity
    );
    const dataYMin = data.reduce(
        (currMin, item) => Math.min(currMin, item.occupancy_in_percentage),
        Infinity
    );
    const dataYRange = dataYMax - dataYMin;    
    
    const barPlotWidth = width / data.length;
    
	return (
        <div className={styles.block}>
            <h2 className={styles.block__title}>График загруженности</h2>
            <div className={styles.block__chart}>
                <svg width={chartWidth} height={chartHeight} className={styles.chart}>
                    {data.map((item, index) => {                    
                        const x = MARGIN + index * barPlotWidth;

                        const yRatio = (item.occupancy_in_percentage - dataYMin) / dataYRange;

                        const y = MARGIN + (1 - yRatio) * height;
                        const heightBar = yRatio * height;

                        const sidePadding = 10;
                        return (
                            <g key={index}>
                              <rect
                                x={x + sidePadding / 2}
                                y={y}
                                width={barPlotWidth - sidePadding}
                                height={heightBar}
                              />
                              <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
                                {weekDayNamesMap.get(item.weekday)}
                              </text>
                            </g>
                          );
                    })}
                </svg>
            </div>
        </div>)
}