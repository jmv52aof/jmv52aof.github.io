import styles from '../styles/marker.module.scss'

type Props = {
	stationsCount: number
}

export default function StationsGroupMarker(props: Props): React.JSX.Element {
	return (
		<div className={styles.groupMarker}>
			<a className={styles.groupMarker__counter}>{props.stationsCount}</a>
		</div>
	)
}
