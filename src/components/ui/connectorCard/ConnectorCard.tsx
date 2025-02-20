import { useState } from "react";
import styles from "./styles.module.scss";

type Props = {
    onChange: (enabled: boolean) => void;
    enabled?: boolean;
    iconSrc: string;
    text: string;
    disabled?: boolean;
};

export default function ConnectorCard(props: Props) {
    const [selected, setSelected] = useState(props.enabled);

    const handleClick = () => {
        if (!props.disabled) {
            const newState = !selected;
            setSelected(newState);
            props.onChange(newState);
        }
    };

    return (
        <div 
            className={`${styles.card} ${selected ? styles.selected : ""} ${props.disabled ? styles.disabled : ""}`} 
            onClick={handleClick}
        >
            <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                    <img src={props.iconSrc} alt="icon" />
                </div>
                <div className={styles.cardTittle}>
                    <span className={styles.cardText}>{props.text}</span>
                </div>
            </div>     
        </div>
    );
}