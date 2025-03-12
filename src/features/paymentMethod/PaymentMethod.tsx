import React from 'react';
import styles from './styles.module.scss';
import warningImage from '@assets/images/status/warning.svg';
import successImage from '@assets/images/status/success.svg';

type Props =
  | {
      isBound: true;
      paymentMethod: string;
    }
  | {
      isBound: false;
      paymentMethod?: string;
    };

/**
 * Компонент отображения статуса привязки способа оплаты
 */
export default function PaymentMethodFeature(
  props: Readonly<Props>,
): React.JSX.Element {
  return (
    <div className={styles.content__info}>
      {props.isBound ? (
        <>
          <p className={styles.info__title}>Способ оплаты привязан</p>
          <img src={successImage} alt='Success' className={styles.info__icon} />
          <p
            className={`${styles.info__text} ${styles.info__text_paymentMethod}`}
          >
            {props.paymentMethod}
          </p>
        </>
      ) : (
        <>
          <p className={styles.info__title}>Способ оплаты не привязан</p>
          <img src={warningImage} alt='Warning' className={styles.info__icon} />
          <p className={styles.info__text}>
            Без способа оплаты вы не сможете заряжаться на платных станциях
          </p>
        </>
      )}
    </div>
  );
}
