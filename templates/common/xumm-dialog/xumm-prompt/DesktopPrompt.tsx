import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { CreatedPayload } from 'xumm-sdk/dist/src/types';

import { Box, Stack, Typography } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { CircularLoader } from '@xpmarket/xpm.ui.loaders.circular-loader';
import { ErrorPlaceholder } from '@xpmarket/xpm.ui.placeholders';

import { QrCode } from './QrCode';

interface Props {
  data: CreatedPayload | undefined;
  isError: boolean;
  isLoading: boolean;
  hasExpired: boolean;
}

export const DesktopPrompt: FC<Props> = (props) => {
  const { isLoading, data, hasExpired, isError } = props;
  const { t } = useTranslation();

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
        <ErrorPlaceholder />
      </Box>
    );
  }

  if (hasExpired) {
    return (
      <Box sx={styles.merge('root', 'fixedSize')}>
        <ErrorPlaceholder title={t('common:walletDialog.expired')} />
      </Box>
    );
  }

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <QrCode data={data} isExpired={hasExpired} />
      <Typography fontWeight="fontWeightRegular" fontSize={12}>
        {t('common:walletDialog.description')}
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
    overflow: 'auto',
    height: 400,
    backgroundColor: 'card.main',
    borderRadius: 2,
  },
  fixedSize: {
    width: '100%',
    height: 400,
  },
});
