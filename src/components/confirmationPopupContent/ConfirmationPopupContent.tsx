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

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = await props.onConfirm();
      if (result) {
        setError(result);
      } else {
        props.onClose();
      }
    } catch (err) {
      setError(err as ResponseError);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.content}>
        <p className={styles.title}>Отправляем запрос...</p>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.content}>
        <p className={styles.title}>
          {props.errorTitle || 'Произошла непредвиденная ошибка'}
        </p>
        {props.description && (
          <p className={styles.description}>{props.description}</p>
        )}
        <img src={errorIcon} alt='Error' className={styles.icon} />
        <Button variant='fill' onClick={props.onClose} text='Техподдержка' />
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <p className={styles.title}>{props.title}</p>
      {props.description && (
        <p className={styles.description}>{props.description}</p>
      )}
      <div className={styles.buttons}>
        <Button variant='text' onClick={props.onClose} text='Отменить' />
        <Button variant='fill' onClick={handleConfirm} text='Подтвердить' />
      </div>
    </div>
  );
}
