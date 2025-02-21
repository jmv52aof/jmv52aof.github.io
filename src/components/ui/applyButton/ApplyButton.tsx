import styles from "./styles.module.scss";

type Props = {
    onClick: () => void;
    disabled: boolean;
    text: string;
};

export default function ApplyButton(props: Props) {
    return (
        <button 
            className={`${styles.applyButton} ${props.disabled ? styles.applyButton_disabled : styles.applyButton_active}`} 
            onClick={props.onClick} 
            disabled={props.disabled}
        >
            <span className={props.disabled ? styles.applyButton__text_disabled : styles.applyButton__text_active}>{props.text}</span>
        </button>
    );
}
