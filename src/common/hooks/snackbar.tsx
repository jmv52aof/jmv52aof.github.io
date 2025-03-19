import { useState, useEffect } from 'react';
import { Variant } from '@common/types/snackbar';
import SnackbarLayout from '@layouts/snackbarLayout/SnackbarLayout';
import { SnackbarState } from '@common/types/snackbar';

export function useSnackbar() {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    text: undefined,
    variant: undefined,
    isVisible: false,
  });

  const showSnackbar = (variant: Variant, text: string) => {
    setSnackbarState({ variant, text, isVisible: false });

    requestAnimationFrame(() => {
      setSnackbarState((prev) => ({ ...prev, isVisible: true }));
    });
  };

  const hideSnackbar = () => {
    setSnackbarState((prev) => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    if (snackbarState.isVisible) {
      const timer = setTimeout(() => {
        hideSnackbar();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbarState.isVisible]);

  useEffect(() => {
    if (!snackbarState.isVisible && snackbarState.text) {
      const cleanupTimer = setTimeout(() => {
        setSnackbarState({
          text: undefined,
          variant: undefined,
          isVisible: false,
        });
      }, 500);
      return () => clearTimeout(cleanupTimer);
    }
  }, [snackbarState.isVisible, snackbarState.text]);

  const snackbar =
    snackbarState.text && snackbarState.variant ? (
      <SnackbarLayout
        variant={snackbarState.variant}
        text={snackbarState.text}
        isVisible={snackbarState.isVisible}
        onClose={hideSnackbar}
      />
    ) : null;

  return { showSnackbar, snackbar };
}
