import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { Box, Stack, Typography } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { Button } from '@xpmarket/xpm.ui.buttons.button';
import { CircularLoader } from '@xpmarket/xpm.ui.loaders.circular-loader';

import { useLoginPromptRequest } from './useLoginPromptRequest';

interface Props {
  onSuccess: () => void;
}

export const LoginPromptCard: FC<Props> = (props) => {
  const { onSuccess } = props;
  const { data, requestLogin, isLoading, isError, wasSigned } =
    useLoginPromptRequest(onSuccess);
  const { t } = useTranslation();
  const isValidQr = !!data;

  return (
    <Box
      px={2}
      py={8}
      width="100%"
      maxWidth={{
        xs: '100%',
        md: '400px',
      }}
      bgcolor="card.main"
      textAlign="center"
    >
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <Stack spacing={1} justifyContent="center" alignItems="center">
          <Typography sx={styles.getValue('title')}>
            {t('common:loginDialog.loginTitle')}
          </Typography>
        </Stack>
        <Stack spacing={4} mt={4} justifyContent="center" alignItems="center">
          {isValidQr && !wasSigned && (
            <Stack spacing={1}>
              <Typography sx={styles.getValue('secondary')}>
                {t('common:walletDialog.mobileDescription')}
              </Typography>
            </Stack>
          )}
          {wasSigned && (
            <Typography sx={styles.merge('secondary', 'success')}>
              {t('common:walletDialog.wasSigned')}
            </Typography>
          )}
          {isValidQr && !wasSigned && <CircularLoader size={20} isCentered />}
          {isError && (
            <Typography sx={styles.merge('secondary', 'error')}>
              {t('common:errors.loginUnreachable')}
            </Typography>
          )}
          {!isValidQr && !wasSigned && (
            <Button fullWidth onClick={requestLogin} loading={isLoading}>
              {t('common:loginDialog.signIn')}
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const styles = new SxStyles({
  title: {
    fontSize: 24,
    fontWeight: 'fontWeightRegular',
    color: (theme) =>
      theme.palette.mode === 'light' ? 'static.black' : 'static.white',
  },
  error: {
    color: 'error.main',
  },
  success: {
    color: 'success.main',
  },
  secondary: {
    fontSize: 14,
    fontWeight: 'fontWeightRegular',
    color: (theme) =>
      theme.palette.mode === 'light' ? 'static.black' : 'static.white',
  },
});
