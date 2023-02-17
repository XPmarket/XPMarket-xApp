import { FC } from 'react';

import { Box, Stack } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { useThemeConfig } from '@xpmarket/xpm.system.theme-provider';
import { ContentSpacer } from '@ui/spacing/ContentSpacer';

import { AppLogoLink } from '../../AppLogoLink';

export const HeaderBar: FC = () => {
  const { mode } = useThemeConfig();

  return (
    <Box sx={styles.getValue('root')}>
      <ContentSpacer
        sx={styles.getValue('container')}
        contentProps={{ sx: styles.getValue('contentWrapper') }}
      >
        <Stack
          direction="row"
          width="100%"
          height="100%"
          flexWrap="nowrap"
          alignItems="center"
          overflow="hidden"
          spacing={2}
        >
          <AppLogoLink variant={mode} />
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            color="static.dove"
          >
            <Box display="flex" flexGrow={1} />
          </Stack>
        </Stack>
      </ContentSpacer>
    </Box>
  );
};

const styles = new SxStyles({
  root: {
    display: 'flex',
    width: '100%',
  },
  container: {
    position: 'relative',
    display: 'flex',
    width: 'inherit',
    alignItems: 'center',
  },
  contentWrapper: {
    position: 'relative',
    display: 'flex',
    width: 'inherit',
    height: '100%',
  },
});
