import styles from "../styles/clusterMarker.module.scss";

type Props = {
    count: number
    onClick?: () => void
}

export default function ClusterMarker(props: Props): React.JSX.Element {
    return (
        <div
            className={styles.marker}
            onClick={() => {
                if (props.onClick) props.onClick();
            }}
        >
            <a className={styles.marker__text}>{props.count}</a>
        </div>
    );
}