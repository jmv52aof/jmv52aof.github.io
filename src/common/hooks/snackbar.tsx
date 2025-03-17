import { useState } from 'react'
import { Variant } from '@components/snackbar/lib/types'

export function useSnackbar(initialVariant: Variant, initialText: string) {
	const [isVisible, setIsVisible] = useState(false)
	const [snackbarText, setSnackbarText] = useState(initialText)
	const [snackbarVariant, setSnackbarVariant] =
		useState<Variant>(initialVariant)

	const showSnackbar = (type: Variant = initialVariant, message: string) => {
		setSnackbarVariant(type)
		setSnackbarText(message)
		setIsVisible(true)

		setTimeout(() => {
			setIsVisible(false)
		}, 2500)
	}

	return { snackbarText, snackbarVariant, isVisible, showSnackbar }
}
