import styles from './styles.module.scss'

type Props = {
    onClick: () => void;
    iconSrc: string;
    disabled?: boolean;
};

export default function ReturnButton(props: Props) {
    return (
        <button
            className={`${styles.returnButton} ${props.disabled ? styles.returnButton_disabled : ""}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <img src={props.iconSrc} alt="returnButton" />
        </button>
    );
}