import React, { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { CreatedPayload } from 'xumm-sdk/dist/src/types';

import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { TOAST_IDS } from '@system/constants';
import { useXApp } from '@templates/common/layout/page-layout/XAppContext';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { CircularLoader } from '@xpmarket/xpm.ui.loaders.circular-loader';
import { ErrorPlaceholder } from '@ui/placeholders/ErrorPlaceholder';

interface Props {
  data: CreatedPayload | undefined;
  isError: boolean;
  isLoading: boolean;
  hasExpired: boolean;
  onCancel: () => void;
}

export const MobilePrompt: FC<Props> = (props) => {
  const { isLoading, data, hasExpired, isError, onCancel } = props;
  const { t } = useTranslation();
  const { xApp } = useXApp();
  const uuid = data?.uuid;

  useEffect(() => {
    if (uuid) {
      xApp?.openSignRequest({ uuid });
    }

    xApp?.on('payload', (response) => {
      if (response.reason === 'DECLINED') {
        toast.error(t<string>('common:walletDialog.declined'), {
          toastId: TOAST_IDS.txDeclinded,
        });
      }
      if (response.reason === 'SIGNED') {
        toast.success(t<string>('common:walletDialog.signed'), {
          toastId: TOAST_IDS.txSigned,
        });
      }

      onCancel();
    });
  }, [uuid, t, xApp, onCancel]);

  if (isLoading) {
    return (
      <Box sx={styles.merge('root', 'fixedSize')}>
        <CircularLoader isCentered />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box sx={styles.merge('root', 'fixedSize')}>
        <ErrorPlaceholder variant="background" bgcolor="card" />
      </Box>
    );
  }

  if (hasExpired) {
    return (
      <Box sx={styles.merge('root', 'fixedSize')}>
        <ErrorPlaceholder
          title={t('common:walletDialog.expired')}
          variant="background"
          bgcolor="card"
        />
      </Box>
    );
  }

  return (
    <Stack sx={styles.getValue('root')} spacing={2}>
      <Typography fontWeight="fontWeightBold" fontSize={13}>
        {t('common:walletDialog.mobileDescription')}
      </Typography>
      <CircularLoader size={20} isCentered />
    </Stack>
  );
};

const styles = new SxStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    p: {
      xs: 2,
      sm: 4,
    },
    width: '100%',
    backgroundColor: 'card.main',
    borderRadius: 2,
  },
  fixedSize: {
    width: '100%',
  },
});
