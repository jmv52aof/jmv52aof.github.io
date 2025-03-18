import React from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  isActive: boolean;
};

const Popup: React.FC<Props> = (props: Readonly<Props>) => {
  const handlers = useSwipeable({
    onSwipedDown: () => props.onClose(),
    trackMouse: true,
  });

  return (
    <div className={`${styles.popup} ${props.isActive ? styles.active : ''}`}>
      <div
        className={styles.popup__content}
        {...handlers}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.content__topLine}></div>
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
