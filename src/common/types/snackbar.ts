export type SnackbarState = {
  text?: string;
  variant?: Variant;
  isVisible: boolean;
};

export type Variant = 'success' | 'warning' | 'error';
