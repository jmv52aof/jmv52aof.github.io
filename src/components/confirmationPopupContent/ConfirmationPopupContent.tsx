import React, { useState } from 'react';
import Button from '@components/ui/button/Button';
import { Loader } from '@components/ui/loader/Loader';
import styles from './styles.module.scss';
import errorIcon from '@assets/images/status/error.svg';
import { ResponseError } from '@common/types/requests';

type Props = {
  title: string;
  description?: string;
  onConfirm: () => Promise<ResponseError | undefined>;
  onClose: () => void;
  errorTitle?: string;
};

export default function ConfirmationPopupContent(
  props: Props,
): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ResponseError | null>(null);

  const handleConfirm = () => {
    setIsLoading(true);
    props
      .onConfirm()
      .then((res) => {
        if (!res) {
          props.onClose();
        } else {
          setError(res);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className={styles.content}>
        <p className={styles.title}>Отправляем запрос...</p>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <p className={styles.title}>
        {error
          ? props.errorTitle || 'Произошла непредвиденная ошибка'
          : props.title}
      </p>
      {props.description && (
        <p className={styles.description}>{props.description}</p>
      )}
      {error ? (
        <>
          <img src={errorIcon} alt='Error' className={styles.icon} />
          <Button variant='fill' onClick={props.onClose} text='Техподдержка' />
        </>
      ) : (
        <div className={styles.buttons}>
          <Button variant='text' onClick={props.onClose} text='Отменить' />
          <Button variant='fill' onClick={handleConfirm} text='Подтвердить' />
        </div>
      )}
    </div>
  );
}
