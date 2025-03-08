export interface ContentBlockItem {
    description: string
    value: string
    checkVisible?: (value: string) => boolean
}