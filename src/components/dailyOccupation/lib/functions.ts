import { DailyOccupationDto } from "@common/types/stations"
import {ColumnInterpolationColors}  from "./consts"
import { DAYS_IN_WEEK } from "@common/consts/date"

export const generateHexColorByPercentage = (percentage: number) : string => {
    const g = Math.round(ColumnInterpolationColors.MIN_GREEN 
        - (percentage / 100) * (ColumnInterpolationColors.MIN_GREEN - ColumnInterpolationColors.MAX_GREEN))
    const b = Math.round(ColumnInterpolationColors.MIN_BLUE 
        - (percentage / 100) * (ColumnInterpolationColors.MIN_BLUE - ColumnInterpolationColors.MAX_BLUE))
    return `#00${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
/** 
* Функция заполняет массив объектов DailyOccupationDto недостающими днями недели
* @param data - отсортированный массив объектов DailyOccupationDto[]
* @returns - массив заполненный всеми днями недели
*/
export const fillData = (data: DailyOccupationDto[]): DailyOccupationDto[] => {
    const result: DailyOccupationDto[] = []
    let dataIdx = 0
    for (let i = 1; i <= DAYS_IN_WEEK; i++) {
        const item: DailyOccupationDto = {
            weekday: i,
            occupancy_in_percentage: 0
        }
        if (dataIdx < data.length && data[dataIdx].weekday === i) {
            item.occupancy_in_percentage = data[dataIdx].occupancy_in_percentage
            dataIdx++
        }        
        result.push(item)
    }
    return result
}