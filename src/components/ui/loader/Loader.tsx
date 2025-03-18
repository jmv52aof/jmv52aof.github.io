import CircularProgress from '@mui/material/CircularProgress'
import styles from './styles.module.scss'

type Props = {
	className?: string
}

export function Loader(props: Props): React.JSX.Element {
	return (
		<div className={styles.loader}>
			<CircularProgress className={props.className} />
		</div>
	)
}
