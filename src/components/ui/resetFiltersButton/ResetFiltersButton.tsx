import styles from "./styles.module.scss";

type Props = {
    onClick: () => void;
    disabled?: boolean;
    iconSrc: string
    text: string;
};

export default function ResetFiltersButton(props: Props) {
    return (
        <button 
            className={`${styles.resetButton} ${props.disabled ? styles.resetButton_disabled : styles.resetButton_active}`} 
            onClick={props.onClick} 
            disabled={props.disabled}
        >
            <img src={props.iconSrc} alt="resetFiltersIcon" className={styles.resetButton__icon} />
            <span>{props.text}</span>
        </button>
    );
}
