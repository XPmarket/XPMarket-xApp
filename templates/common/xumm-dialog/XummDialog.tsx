import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { CreatedPayload } from 'xumm-sdk/dist/src/types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useToggle } from '@xpmarket/xpm.system.use-toggle';
import { Button } from '@xpmarket/xpm.ui.buttons.button';

import { XummPrompt } from './xumm-prompt/XummPrompt';
import { useTransactionObserver } from './useTransactionObserver';

interface Props {
  onCancel: () => void;
  data: CreatedPayload | undefined;
  isOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  withOptionalStep: boolean;
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
    withOptionalStep,
    ...rest
  } = props;
  const { isToggled, toggleOn } = useToggle(false);
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
        {!isToggled && withOptionalStep && (
          <Stack spacing={1}>
            <Typography fontWeight="fontWeightBold" fontSize={13}>
              {t('common:walletDialog.toggleDescription')}
            </Typography>
            <Typography
              variant="body2"
              color="error.main"
              fontWeight="fontWeightMedium"
              onClick={toggleOn}
              sx={{
                cursor: 'pointer',
              }}
            >
              {t('common:walletDialog.toggleAction')}
            </Typography>
          </Stack>
        )}
        {(isToggled || !withOptionalStep) && (
          <XummPrompt
            data={data}
            isLoading={isLoading}
            isError={isError}
            hasExpired={hasExpired}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          {t('common:cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
