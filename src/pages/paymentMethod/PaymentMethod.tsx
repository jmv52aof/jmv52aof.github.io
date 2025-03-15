import React from 'react';
import styles from './styles.module.scss';
import ReturnButton from '@components/ui/returnButton/ReturnButton';
import ActionButton from '@components/ui/actionButton/ActionButton';
import arrowImage from '@assets/images/arrow-left.svg';
import commonStyles from '@common/styles.module.scss';
import PaymentMethod from '@features/paymentMethod/PaymentMethod';
import { useNavigate } from 'react-router';

export default function PaymentMethodPage(): React.JSX.Element {
  const nav = useNavigate();
  // Временная заглушка
  const paymentMethod = 'СБП Т-Банк';

  return (
    <div className={commonStyles.page}>
      <div className={styles.page__content}>
        <div className={styles.content__header}>
          <div className={styles.header__button}>
            <ReturnButton onClick={() => nav('/')} iconSrc={arrowImage} />
          </div>
          <a className={styles.header__tittle}>Способ оплаты</a>
        </div>

        <div className={styles.content__main}>
          <PaymentMethod paymentMethod={paymentMethod} />
        </div>

        <div className={styles.content__actionButton}>
          <ActionButton
            text={
              paymentMethod
                ? 'Удалить способ оплаты'
                : 'Привязать способ оплаты'
            }
            variant={paymentMethod ? 'red' : 'green'}
            onClick={() => {
              console.log(
                paymentMethod
                  ? 'Удалить способ оплаты'
                  : 'Привязать способ оплаты',
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
