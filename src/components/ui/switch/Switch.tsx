import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

type Props = {
    onChange: (enabled: boolean) => void;
    enabled?: boolean;
    disabled?: boolean;
};

export default function Switch(props: Props) {
    const [isEnabled, setIsEnabled] = useState<boolean>(props.enabled ?? true);

    useEffect(() => {
        setIsEnabled(props.enabled ?? true);
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
            <div className={styles.switch__toggle} />
        </div>
    );
}