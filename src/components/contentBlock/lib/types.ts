export interface ContentBlockItem {
    description: string
	iconSrc?: string
    value?: string
    checkVisible?: (value?: string) => boolean
}