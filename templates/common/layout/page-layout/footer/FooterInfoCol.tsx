import { FC } from 'react';
import { Trans, useTranslation } from 'next-i18next';

import { Stack, Typography } from '@mui/material';
import { EXTERNAL_ROUTES } from '@xpmarket/xpm.system.routes';
import { TwitterIcon } from '@xpmarket/xpm.ui.icons.twitter-icon';
import { TextLink } from '@ui/buttons/TextLink';

export const FooterInfoCol: FC = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing={2} fontSize="14px">
      <Typography fontWeight="fontWeightRegular" fontSize="inherit">
        <Trans
          t={t}
          i18nKey="common:layout.footer.contact"
          components={[
            <TextLink
              key="twitter"
              href={EXTERNAL_ROUTES.xpmarketTwitter}
              target="_blank"
              rel="nofollow noopener noreferrer"
              display="inline-flex"
              fontWeight="inherit"
              fontSize="inherit"
              endIcon={<TwitterIcon fontSize="small" />}
            />,
          ]}
        />
      </Typography>
    </Stack>
  );
};
