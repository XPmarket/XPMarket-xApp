import { FC } from 'react';

import { Box, Stack } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { ContentSpacer } from '@ui/spacing/ContentSpacer';

import { AppLogoLink } from '../AppLogoLink';
import { FooterInfoCol } from './FooterInfoCol';

export const Footer: FC = () => {
  return (
    <Box component="footer">
      <ContentSpacer
        contentProps={{
          sx: styles.getValue('spacer'),
        }}
      >
        <Stack
          spacing={2}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          alignItems={{
            xs: 'flex-start',
            md: 'center',
          }}
        >
          <AppLogoLink variant="light" sx={styles.getValue('logo')} />
          <FooterInfoCol />
        </Stack>
      </ContentSpacer>
    </Box>
  );
};

const styles = new SxStyles({
  spacer: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    backgroundColor: 'card.dark',
    color: 'static.boulder',
    px: {
      xs: 2,
      sm: 3,
    },
    py: {
      xs: 3,
      sm: 4,
    },
  },
  logo: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
