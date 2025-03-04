import styles from './styles.module.scss'
import { Variant } from './lib/types';

type Props = {
    onClick: () => void;
    variant: Variant;
    iconSrc: string;
    disabled?: boolean;
};

export default function Button(props: Props): React.JSX.Element {
    const onClickHandler = () => {
        if (!props.disabled) props.onClick();
    };

    return (
        <button
            onClick={onClickHandler}
            disabled={props.disabled}
            className={`${styles.button} ${styles[props.variant]} ${props.disabled ? styles[props.variant + 'Disabled'] : ''}`}
        >
            <img src={props.iconSrc} alt="Icon" className={styles[`${props.variant}__icon`]} />
        </button>
    );
}