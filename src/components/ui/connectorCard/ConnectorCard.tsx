import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

type Props = {
    onChange: (enabled: boolean) => void;
    enabled?: boolean;
    iconSrc: string;
    text: string;
    disabled?: boolean;
};

export default function ConnectorCard(props: Props) {
    const [isEnabled, setSelected] = useState(props.enabled ?? true);

    useEffect(() => {
        setSelected(props.enabled ?? true);
    }, [props.enabled]);

    const handleClick = () => {
        if (!props.disabled) {
            setSelected(!isEnabled);
            props.onChange(!isEnabled);
        }
    };

    return (
        <div 
            className={`${styles.card} ${isEnabled ? styles.card_enabled : ""} ${props.disabled ? styles.card_disabled : ""}`} 
            onClick={handleClick}
        >
            <div className={styles.card__content}>
                <div className={styles.card__icon}>
                    <img src={props.iconSrc} alt="icon" />
                </div>
                <div className={styles.card__tittle}>
                    <span className={styles.card__tittle__text}>{props.text}</span>
                </div>
            </div>     
        </div>
    );
}