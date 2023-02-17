import { FC } from 'react';

import { AppBar, Stack, Toolbar } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';

import { HeaderBar } from './header-bar/HeaderBar';
import { APP_HEADER_ID, HEADER_HEIGHT } from './constants';
import { ProgressBar } from './ProgressBar';

export const Header: FC = () => {
  return (
    <>
      <AppBar
        elevation={0}
        color="transparent"
        sx={styles.getValue('appBar')}
        id={APP_HEADER_ID}
      >
        <Toolbar disableGutters sx={styles.getValue('toolbar')}>
          <Stack flexGrow={1}>
            <HeaderBar />
            <ProgressBar />
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Space holder for floating content */}
      <Stack visibility="hidden">
        <Toolbar sx={styles.getValue('toolbar')} />
      </Stack>
    </>
  );
};

const styles = new SxStyles({
  appBar: {
    bgcolor: 'background.default',
    borderBottom: (theme) => `thin solid ${theme.palette.yankees.main}`,
    filter: 'drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.20))',
  },
  toolbar: {
    height: HEADER_HEIGHT,
    minHeight: HEADER_HEIGHT,
  },
});
