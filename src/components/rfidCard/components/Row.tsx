import styles from '../styles/row.module.scss'

type Props = {
	name: string
	value: string
}

export default function RfidCardRow(props: Readonly<Props>): React.JSX.Element {
	return (
		<div className={styles.row}>
			<a className={styles.row__first}>{props.name}:</a>
			<a className={styles.row__second}>{props.value}</a>
		</div>
	)
}
