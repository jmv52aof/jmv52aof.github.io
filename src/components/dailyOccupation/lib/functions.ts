import { MAX_BLUE, MAX_GREEN, MIN_BLUE, MIN_GREEN } from "./consts"

export const generateColorByPercentage = (percentage: number) : string => {
    const g = Math.round(MIN_GREEN - (percentage / 100) * (MIN_GREEN - MAX_GREEN))
    const b = Math.round(MIN_BLUE - (percentage / 100) * (MIN_BLUE - MAX_BLUE))
    return `#00${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
