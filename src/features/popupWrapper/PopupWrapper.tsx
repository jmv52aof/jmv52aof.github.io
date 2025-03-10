import React, { useState, useEffect } from 'react';
import Popup from '../../components/popup/Popup';
import styles from './styles.module.scss';

interface PopUpWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const PopUpWrapper: React.FC<PopUpWrapperProps> = ({ children, isOpen, onClose }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsActive(true);
            document.body.style.overflow = 'hidden';
        } else {
            setIsActive(false);
            document.body.style.overflow = 'unset';
      }
    }, [isOpen]);

    const handleClose = () => {
        setIsActive(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <Popup onClose={handleClose}>
            <div className={`${styles.popup__overlay} ${isActive ? styles.active : ''}`}>
                <div className={styles.popup__content}>
                    {children}
                </div>
            </div>
        </Popup>
    );
};

export default PopUpWrapper;