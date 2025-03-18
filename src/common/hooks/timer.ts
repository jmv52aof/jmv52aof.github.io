import { useEffect, useState } from 'react'

/**
 * Хук предоставляет управляемый интервал, который выполняет действие
 * через каждый заданный промежуток времени
 */
export const useInterval = (
	action: () => any,
	intervalTime: number,
	dependencies: any[]
) => {
	const [intervalId, setIntervalId] = useState<number | undefined>()
	const [timerIsActive, setTimerIsActive] = useState<boolean>(false)

	useEffect(() => {
		clearInterval(intervalId)

		if (timerIsActive) {
			setIntervalId(setInterval(() => action(), intervalTime))
		} else {
			setIntervalId(undefined)
		}
	}, [timerIsActive].concat(dependencies))

	useEffect(() => {
		return () => {
			clearInterval(intervalId)
		}
	}, [intervalId])

	return {
		activate: () => setTimerIsActive(true),
		deactivate: () => setTimerIsActive(false),
	}
}
