import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

type Props = {
    onChange: (checked: boolean) => void;
    enabled?: boolean;
    disabled?: boolean;
};

export default function Switch(props: Props) {
    const [isEnabled, setIsEnabled] = useState(props.enabled);

    useEffect(() => {
        setIsEnabled(props.enabled);
    }, [props.enabled]);

    const toggleSwitch = () => {
        if (!props.disabled) {
            setIsEnabled(!isEnabled);
            props.onChange(!isEnabled);
        }
    };

    return (
        <div
            className={`${styles.switch} ${isEnabled ? styles.on : styles.off} ${
                props.disabled ? styles.disabled : ""
            }`}
            onClick={toggleSwitch}
        >
            <div className={styles.toggle} />
        </div>
    );
}