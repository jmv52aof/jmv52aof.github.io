import { ExpandVariant, Variant } from './types'

/** Расширяет `variant` */
const expandVariant = (
	variant: Variant,
	iconExists?: boolean
): ExpandVariant => {
	if (variant === 'fill' && iconExists) return 'fillWithIcon'
	if (variant === 'text' && iconExists) return 'textWithIcon'
	return variant
}

export { expandVariant }
