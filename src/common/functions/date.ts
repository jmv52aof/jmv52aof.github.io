import { Timestamp } from "@common/types/date"

const formatTimeNumber = (timeNumber: number) => {
    return timeNumber < 10 ? `0${timeNumber}` : `${timeNumber}`
}

const timeToDate = (timestamp: Timestamp) => {
    const date = new Date()    
    date.setHours(timestamp.hours, timestamp.minutes, timestamp.seconds)
    return date
}

const dateToTimestamp = (date: Date): Timestamp => {
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds()
    }
}

export const timeToISOString = (hours: number, minutes: number, seconds: number) => {
    return `${formatTimeNumber(hours)}:${formatTimeNumber(minutes)}:${formatTimeNumber(seconds)}`
}

export const timeToString = (hours: number, minutes: number, seconds: number) => {
    return `${hours === 0 ? '' : `${hours}ч.`} ${minutes === 0 ? '' : `${minutes}м.`} ${seconds === 0 ? '' : `${seconds}сек.`}`
}

export const getTimesDifference = (reduced: Timestamp, subtracted: Timestamp) => {   
    const difference = reduced.hours < subtracted.hours 
        ? timeToDate(subtracted).getTime() - timeToDate(reduced).getTime()
        : timeToDate(reduced).getTime() - timeToDate(subtracted).getTime()
    return dateToTimestamp(new Date(difference))
}