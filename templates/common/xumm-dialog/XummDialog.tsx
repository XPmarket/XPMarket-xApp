import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { CreatedPayload } from 'xumm-sdk/dist/src/types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Button } from '@xpmarket/xpm.ui.buttons.button';

import { MobilePrompt } from './xumm-prompt/MobilePrompt';
import { useTransactionObserver } from './useTransactionObserver';

interface Props {
  onCancel: () => void;
  data: CreatedPayload | undefined;
  isOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  onSuccess: (id: string) => void;
  title?: string;
  onBackdropClick?: () => void;
}

export const XummDialog: FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    data,
    title = t('common:walletDialog.title'),
    isOpen,
    isLoading,
    isError,
    onBackdropClick,
    onSuccess,
    onCancel,
    ...rest
  } = props;
  const { hasExpired } = useTransactionObserver(data, onSuccess, onCancel);

  return (
    <Dialog
      open={isOpen}
      onClose={onBackdropClick}
      aria-labelledby="alert-dialog-title"
      fullWidth
      maxWidth="xs"
      {...rest}
      PaperProps={{
        sx: {
          m: 2,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <MobilePrompt
          data={data}
          isLoading={isLoading}
          isError={isError}
          hasExpired={hasExpired}
          onCancel={onCancel}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          {t('common:cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
