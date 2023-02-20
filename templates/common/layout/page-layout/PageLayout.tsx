import { FC, ReactNode } from 'react';
import Script from 'next/script';

import { Stack } from '@mui/material';
import { ENV } from '@system/env/constants';
import { SxStyles } from '@xpmarket/xpm.system.theme';

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
        {/* Debugger: https://remotejs.com/viewer/823382c3-daa3-71d3-0992-8df98a4941b7 */}
        {ENV.client.appEnv !== 'local' && (
          <Script
            src="https://remotejs.com/agent/agent.js"
            data-consolejs-channel="823382c3-daa3-71d3-0992-8df98a4941b7"
          />
        )}
        <HeadAppends />
        <Stack>
          <Stack sx={styles.getValue('view')}>
            <Header />
            <Body>{children}</Body>
          </Stack>
        </Stack>
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
