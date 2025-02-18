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
    const margin = 50
    const width = chartWidth - margin * 2
    const height = chartHeight - margin * 2  
    const barPlotWidth = width / data.length;
    const sidePadding = 10
    const textPadding = 25
    const color = '#0000ff'

    const getColor = (percent: number)  => {
        // Преобразуем HEX в RGB
        let r = parseInt(color.substring(1, 3), 16);
        let g = parseInt(color.substring(3, 5), 16);
        let b = parseInt(color.substring(5, 7), 16);

        // Интерполируем цвет между белым (255, 255, 255) и исходным
        r = Math.round(255 - (255 - r) * (percent / 100));
        g = Math.round(255 - (255 - g) * (percent / 100));
        b = Math.round(255 - (255 - b) * (percent / 100));

        // Преобразуем RGB обратно в HEX
        const toHex = (c: number) => {
            const hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

	return (
        <div className={styles.block}>
            <h2 className={styles.block__title}>График загруженности</h2>
            <div className={styles.block__chart}>
                <svg width={chartWidth} height={chartHeight} className={styles.chart}>
                    {data.map((item, index) => {                    
                        const x = margin + index * barPlotWidth;                                            
                        const y = height - item.occupancy_in_percentage * height / 100;
                        const heightBar = item.occupancy_in_percentage * height / 100;
                        return (
                            <g key={index}>
                              <rect
                                x={x + sidePadding / 2}
                                y={y}
                                rx={10}
                                fill={getColor(item.occupancy_in_percentage)}
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