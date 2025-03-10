import React from 'react';
import styles from './styles.module.scss';
import { Variant } from './lib/types';

type Props = {
  text: string;
  onClick: () => void;
  variant: Variant;
  disabled?: boolean;
};

export default function ActionButton({ text, onClick, variant, disabled }: Props): React.JSX.Element {
  const buttonClassName =
    variant === 'add'
      ? styles.actionButton_add
      : styles.actionButton_remove;

  return (
    <div className={styles.actionButton__container}>
      <button
        className={`${styles.actionButton} ${buttonClassName} ${
          disabled ? styles.actionButton_disabled : ''
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
