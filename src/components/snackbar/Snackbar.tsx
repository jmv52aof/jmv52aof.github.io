import styles from './styles.module.scss';
import { Variant } from './lib/types';
import successIcon from '@assets/images/status/success.svg';
import warningIcon from '@assets/images/status/warning.svg';
import errorIcon from '@assets/images/status/error.svg';

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
                throw new Error('Snackbar variant does not exist');
        }
    };

    const icon = getIcon();

    return (
        <div className={`${styles.snackbar} ${styles[`snackbar_${props.variant}`]}`}>
            <img src={icon} alt={props.variant} className={styles.snackbar__icon} />
            <p className={styles.snackbar__text}>{props.text}</p>
        </div>
    );
}