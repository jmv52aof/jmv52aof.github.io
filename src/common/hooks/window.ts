import { WindowSizes } from '@common/types/window'
import { useEffect, useState } from 'react'

export const useWindowSizes = () => {
	const [windowSizes, setWindowSizes] = useState<WindowSizes>({
		width: window.innerWidth,
		height: window.innerHeight,
	})

	useEffect(() => {
		window.onresize = () => {
			setWindowSizes({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}
	}, [])

	return {
		windowSizes,
	}
}
