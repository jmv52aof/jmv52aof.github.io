import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { ConnectorStandard } from "@common/types/stations";
import { CONNECTOR_TYPE_AND_IMAGE } from "@common/consts/stations";

type Props = {
    onChange: (enabled: boolean) => void;
    enabled?: boolean;
    connector: ConnectorStandard;
    disabled?: boolean;
};

export default function ConnectorCard(props: Props) {
    const [isEnabled, setIsEnabled] = useState<boolean>(props.enabled ?? true);

    useEffect(() => {
        setIsEnabled(props.enabled ?? true);
    }, [props.enabled]);

    const handleClick = () => {
        if (!props.disabled) {
            setIsEnabled(!isEnabled);
            props.onChange(!isEnabled);
        }
    };

    return (
        <div 
            className={`${styles.card} ${isEnabled ? styles.card_enabled : ""} ${props.disabled ? styles.card_disabled : ""}`} 
            onClick={handleClick}
        >
            <div className={styles.card__content}>
                <div className={styles.content__icon}>
                    <img src={CONNECTOR_TYPE_AND_IMAGE[props.connector]} alt={props.connector} />
                </div>
                <div className={styles.content__title}>
                    <span className={styles.title__text}>{props.connector}</span>
                </div>
            </div>     
        </div>
    );
}