import styles from "../styles/coordinates.module.scss";

type Props = {
    latitude: string
    longitude: string
}

export default function Coordinates(props: Props): React.JSX.Element {
    return (
        <div className={styles.coordinates}>
            <a className={styles.coordinates__text}>{props.latitude.substring(0, 10)}</a>
            <a className={styles.coordinates__text}>{props.longitude.substring(0, 10)}</a>
        </div>
    );
}