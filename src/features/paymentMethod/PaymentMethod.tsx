import React from 'react';
import styles from './styles.module.scss';
import warningImage from '@assets/images/status/warning.svg';
import successImage from '@assets/images/status/success.svg';

type Props = {
  paymentMethod?: string;
};

/**
 * Компонент отображения статуса привязки способа оплаты
 */
export default function PaymentMethod(
  props: Readonly<Props>,
): React.JSX.Element {
  const isBound = !!props.paymentMethod;

  return (
    <div className={styles.content__info}>
      <p className={styles.info__title}>
        {isBound ? 'Способ оплаты привязан' : 'Способ оплаты не привязан'}
      </p>

      <img
        src={isBound ? successImage : warningImage}
        alt='Notify icon'
        className={styles.info__icon}
      />

      <p
        className={`${styles.info__text} ${
          isBound ? styles.info__text_paymentMethod : ''
        }`}
      >
        {isBound
          ? props.paymentMethod
          : 'Без способа оплаты вы не сможете заряжаться на платных станциях'}
      </p>
    </div>
  );
}
