/**
 * Макет блока с контентом внутри
 */
type Props = {
	children: React.ReactNode
}

export default function BlockLayout(props: Props): React.JSX.Element {
	return <div>{props.children}</div>
}
