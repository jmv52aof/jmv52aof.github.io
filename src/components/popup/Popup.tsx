import React from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './styles.module.scss';

type Props = {
	children: React.ReactNode,
	onClose: Function,
}

const Popup: React.FC<Props> = (
	props: Readonly<Props>,
) => {
    const handlers = useSwipeable({
        onSwipedDown: () => props.onClose(),
        trackMouse: true,
    });

	return (
        <div onClick={() => props.onClose()}>
            <div className={styles.popup__content} {...handlers} onClick={(e) => e.stopPropagation()}>
                <div className={styles.popup__topLine}></div>
                {props.children}
            </div>
        </div>
	)
}

export default Popup;