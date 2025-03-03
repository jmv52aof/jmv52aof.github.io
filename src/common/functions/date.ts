const formatTimeNumber = (timeNumber: number) => {
    return timeNumber < 10 ? `0${timeNumber}` : `${timeNumber}`
}

export const timeToISOString = (hours: number, minutes: number, seconds: number) => {
    return `${formatTimeNumber(hours)}:${formatTimeNumber(minutes)}:${formatTimeNumber(seconds)}`
}

export const timeToString = (hours: number, minutes: number, seconds: number) => {
    return `${hours === 0 ? '' : `${hours}ч.`} ${minutes === 0 ? '' : `${minutes}м.`} ${seconds === 0 ? '' : `${seconds}сек.`}`
}