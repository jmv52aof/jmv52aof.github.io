import styles from "./styles.module.scss";

type Props = {
    children: React.ReactNode;
};

export default function FiltersBlock(props: Props): React.JSX.Element {
    return <div className={styles.filtersBlock}>{props.children}</div>;
}