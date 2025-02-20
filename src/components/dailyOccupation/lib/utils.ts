export const weekDayNamesMap = new Map<number, string>([
    [1, 'ПН'],
    [2, 'ВТ'],
    [3, 'СР'],
    [4, 'ЧТ'],
    [5, 'ПТ'],
    [6, 'СБ'],
    [7, 'ВС'],
])

export interface ChartState {
    clientWidth: number
    clientHeight: number
    width: number
    height: number
    marginX: number
    marginTop: number
    marginBottom: number
}