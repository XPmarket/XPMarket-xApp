import { FC, ReactNode } from 'react';

import { Stack } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';

import { Footer } from './footer/Footer';
import { HeadAppends } from './head-appends/HeadAppends';
import { Header } from './header/Header';
import { Body } from './Body';
import { XAppProvider } from './XAppContext';

export interface XappPageLayoutProps {
  children: ReactNode;
}

export const PageLayout: FC<XappPageLayoutProps> = (props) => {
  const { children } = props;

  return (
    <XAppProvider>
      <Stack sx={styles.getValue('root')}>
        <HeadAppends />
        <Stack>
          <Stack sx={styles.getValue('view')}>
            <Header />
            <Body>{children}</Body>
          </Stack>
        </Stack>
        <Footer />
      </Stack>
    </XAppProvider>
  );
};

const styles = new SxStyles({
  root: {
    height: '100%',
  },
  view: {
    minHeight: '100vh',
  },
});
