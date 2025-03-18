import { Variant } from '@components/snackbar/lib/types'

export type SnackbarState = {
	text?: string
	variant?: Variant
	isVisible: boolean
}
