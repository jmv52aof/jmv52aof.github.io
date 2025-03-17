import React from 'react';
import styles from './styles.module.scss';
import { Variant } from './lib/types';

type Props = {
  text: string;
  onClick: () => void;
  variant: Variant;
  disabled?: boolean;
};

export default function ActionButton(
  props: Readonly<Props>,
): React.JSX.Element {
  return (
    <button
      className={`${styles.actionButton} ${
        styles[`actionButton_${props.variant}`]
      } ${props.disabled ? styles.actionButton_disabled : ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}
