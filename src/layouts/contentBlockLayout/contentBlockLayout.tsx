import styles from "./styles.module.scss";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function ContentBlockLayout(props: Props): React.JSX.Element {
    return <div className={`${styles.contentBlockLayout} ${props.className || ""}`}>{props.children}</div>;
}
