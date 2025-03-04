import styles from './styles.module.scss';
import { Variant } from './lib/types';
import successIcon from '@assets/images/status-icons/success-icon.svg';
import warningIcon from '@assets/images/status-icons/warning-icon.svg';
import errorIcon from '@assets/images/status-icons/error-icon.svg';

type Props = {
    variant: Variant;
    text: string;
};

export default function Snackbar(props: Props): React.JSX.Element {
    const getIcon = () => {
        switch (props.variant) {
            case 'success':
                return successIcon;
            case 'warning':
                return warningIcon;
            case 'error':
                return errorIcon;
            default:
                return null;
        }
    };

    const icon = getIcon();

    return (
        <div className={`${styles.snackbar} ${styles[`snackbar_${props.variant}`]}`}>
            {icon && <img src={icon} alt={props.variant} className={styles.snackbar__icon} />}
            <span className={styles.snackbar__text}>{props.text}</span>
        </div>
    );
}