import React from 'react';
import styles from './styles.module.scss';
import ReturnButton from '@components/ui/returnButton/ReturnButton';
import ActionButton from '@components/ui/actionButton/ActionButton';
import arrowImage from '@assets/images/arrow-left.svg';
import warningImage from '@assets/images/status/warning.svg';
import successImage from '@assets/images/status/success.svg';
import commonStyles from '@common/styles.module.scss';

type Props = {
  paymentMethod?: string;
};

export default function PaymentMethodPage(props: Props): React.JSX.Element {
  const isPaymentMethodBound = !!props.paymentMethod;

  return (
    <div className={commonStyles.page}>
      <div className={styles.page__content}>
        <div className={styles.content__header}>
          <div className={styles.header__button}>
            <ReturnButton
                onClick={() => {}}
                iconSrc={arrowImage}
            />
          </div>
          <a className={styles.header__tittle}>Способ оплаты</a>
        </div>

        <div className={styles.content__info}>
            {isPaymentMethodBound ? (
                <>
                <h2 className={styles.info__title}>Способ оплаты привязан</h2>
                <img
                    src={successImage}
                    alt="Success"
                    className={styles.info__icon}
                />
                <p className={`${styles.info__text} ${styles.info__text_paymentMethod}`}>
                    {props.paymentMethod}
                </p>
                </>
            ) : (
                <>
                <h2 className={styles.info__title}>
                    Способ оплаты не привязан
                </h2>
                <img
                    src={warningImage}
                    alt="Warning"
                    className={styles.info__icon}
                />
                <p className={styles.info__text}>
                    Без способа оплаты вы не сможете заряжаться на платных станциях
                </p>
                </>
            )}
            </div>

        <div className={styles.content__actionButton}>
          <ActionButton
            text={
              isPaymentMethodBound
                ? 'Удалить способ оплаты'
                : 'Привязать способ оплаты'
            }
            variant={isPaymentMethodBound ? 'remove' : 'add'}
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