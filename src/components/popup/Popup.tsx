import React from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './styles.module.scss';

type Props = {
	children: React.JSX.Element,
	onClose: Function,
}

export default function EmptyDataNotification(
	props: Readonly<Props>,
): React.JSX.Element {
    const handlers = useSwipeable({
        onSwipedDown: () => props.onClose(),
        trackMouse: true,
    });

	return (
        <div className={''} onClick={() => props.onClose()}>
            <div className={''} {...handlers} onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
	)
}
