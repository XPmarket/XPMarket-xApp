import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { CreatedPayload } from 'xumm-sdk/dist/src/types';

import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { CircularLoader } from '@xpmarket/xpm.ui.loaders.circular-loader';
import { ErrorPlaceholder } from '@xpmarket/xpm.ui.placeholders';
import { TextLink } from '@ui/buttons/TextLink';

import { makeXummSignPath } from './helpers';

interface Props {
  data: CreatedPayload | undefined;
  isError: boolean;
  isLoading: boolean;
  hasExpired: boolean;
}

export const MobilePrompt: FC<Props> = (props) => {
  const { isLoading, data, hasExpired, isError } = props;
  const { t } = useTranslation();
  const { push } = useRouter();
  const uuid = data?.uuid;

  useEffect(() => {
    if (uuid) {
      push(makeXummSignPath(uuid));
    }
  }, [uuid, push]);

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
    <Stack sx={styles.getValue('root')} spacing={2}>
      <Typography fontWeight="fontWeightBold" fontSize={13}>
        {t('common:walletDialog.mobileDescription')}
      </Typography>
      <TextLink
        variant="body2"
        color="error.main"
        fontWeight="fontWeightMedium"
        href={makeXummSignPath(uuid)}
        rel="nofollow noopener noreferrer"
      >
        {t('common:walletDialog.noMobileRedirect')}
      </TextLink>
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
