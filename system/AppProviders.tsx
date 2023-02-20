import { FC, ReactNode, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { DehydratedState, Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { DevtoolsOptions } from '@system/fetch/types';
import { LandingQueryParams, XAppThemeMode } from '@templates/landing/types';
import {
  CLIENT_SIDE_EMOTION_CACHE,
  ThemeProvider,
} from '@xpmarket/xpm.system.theme-provider';

import { AuthProvider } from './auth/AuthContext';
import { QUERY_CLIENT } from './fetch/constants';
import { buildYupLocale } from './localization/yup';

buildYupLocale();

const ReactQueryDevtools = dynamic<DevtoolsOptions>(
  () => import('react-query/devtools').then((mod) => mod.ReactQueryDevtools),
  {
    ssr: false,
  }
);

export interface AppProvidersProps {
  children: ReactNode;
  reqSession: string | undefined;
  reqUser: string | undefined;
  reqUserAgent: string | undefined;
  isTestEnv?: boolean;
  dehydratedState?: DehydratedState;
  emotionCache?: EmotionCache;
}

export const AppProviders: FC<AppProvidersProps> = (props) => {
  const {
    dehydratedState,
    children,
    isTestEnv,
    reqSession,
    reqUser,
    emotionCache = CLIENT_SIDE_EMOTION_CACHE,
    reqUserAgent,
  } = props;
  const [queryClient] = useState(() => QUERY_CLIENT);
  const router = useRouter();
  const { xAppStyle } = router.query as LandingQueryParams;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider
        themeMode={getThemeMode(xAppStyle)}
        userAgent={reqUserAgent}
      >
        <ToastContainer
          position="bottom-left"
          autoClose={4500}
          newestOnTop
          draggable={false}
          pauseOnHover={false}
        />
        <QueryClientProvider client={queryClient}>
          <AuthProvider reqSession={reqSession} reqUser={reqUser}>
            {!isTestEnv && <ReactQueryDevtools />}
            <CssBaseline />
            <Hydrate state={dehydratedState}>{children}</Hydrate>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

const getThemeMode = (xAppThemeMode: XAppThemeMode): PaletteMode => {
  if (xAppThemeMode === 'LIGHT') {
    return 'light';
  } else {
    return 'dark';
  }
};
