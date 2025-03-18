import { useState } from 'react'
import { Variant } from '@components/snackbar/lib/types'
import SnackbarLayout from '@layouts/snackbarLayout/SnackbarLayout'
import { SnackbarState } from '@common/types/snackbar'

export function useSnackbar() {
	const [snackbarState, setSnackbarState] = useState<SnackbarState>({
		text: undefined,
		variant: undefined,
		isVisible: false,
	})

	const showSnackbar = (variant: Variant, text: string) => {
		setSnackbarState({ text, variant, isVisible: true })

		setTimeout(() => {
			setSnackbarState(prev => ({ ...prev, isVisible: false }))
		}, 3000)
	}

	const snackbar = snackbarState.isVisible ? (
		<SnackbarLayout
			variant={snackbarState.variant ?? 'success'}
			text={snackbarState.text ?? ''}
		/>
	) : (
		<></>
	)

	return { showSnackbar, snackbar }
}
