import React from 'react';
import styles from './styles.module.scss';
import ReturnButton from '@components/ui/returnButton/ReturnButton';
import ActionButton from '@components/ui/actionButton/ActionButton';
import arrowImage from '@assets/images/arrow-left.svg';
import commonStyles from '@common/styles.module.scss';
import PaymentMethodFeature from '@features/paymentMethod/PaymentMethod';

export default function PaymentMethodPage(): React.JSX.Element {
  // Временная заглушка
  const isPaymentMethodBound = false;
  const paymentMethod = 'СБП Т-Банк';

  return (
    <div className={commonStyles.page}>
      <div className={styles.page__content}>
        <div className={styles.content__header}>
          <div className={styles.header__button}>
            <ReturnButton onClick={() => {}} iconSrc={arrowImage} />
          </div>
          <a className={styles.header__tittle}>Способ оплаты</a>
        </div>

        <PaymentMethodFeature
          isBound={isPaymentMethodBound}
          paymentMethod={paymentMethod}
        />

        <div className={styles.content__actionButton}>
          <ActionButton
            text={
              isPaymentMethodBound
                ? 'Удалить способ оплаты'
                : 'Привязать способ оплаты'
            }
            variant={isPaymentMethodBound ? 'red' : 'green'}
            onClick={() => {
              console.log(
                isPaymentMethodBound
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
