import Snackbar from '@components/snackbar/Snackbar'
import styles from './styles.module.scss'
import { Variant } from '@common/types/snackbar'

type Props = {
	variant: Variant
	text: string
}

export default function SnackbarLayout(props: Props): React.JSX.Element {
	return (
		<div className={styles.snackbarLayout}>
			<Snackbar variant={props.variant} text={props.text} />
		</div>
	)
}
