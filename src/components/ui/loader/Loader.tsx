import CircularProgress from "@mui/material/CircularProgress";
import styles from './styles.module.scss'

export function Loader(): React.JSX.Element {
    return (
        <div className={styles.loader}>
            <CircularProgress/>
        </div>
    )
}