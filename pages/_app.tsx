import { IncomingMessage } from 'http';

import { FC } from 'react';
import { DehydratedState } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import {
  AppContext,
  AppInitialProps,
  AppProps as DefaultAppProps,
} from 'next/app';
import App from 'next/app';
import { appWithTranslation, SSRConfig } from 'next-i18next';

import { EmotionCache } from '@emotion/react';
import { AppProviders } from '@system/AppProviders';
import { COOKIE_STORAGE } from '@system/constants';

import i18nConfig from '../next-i18next.config.js';

interface AppComposition {
  getInitialProps?: (
    appContext: AppContext
  ) => Promise<AppInitialProps & Partial<DefaultAppProps>>;
}

interface PageProps {
  dehydratedState?: DehydratedState;
  _nextI18Next: SSRConfig['_nextI18Next'];
}

interface AppProps extends DefaultAppProps<PageProps> {
  emotionCache: EmotionCache | undefined;
  reqSession: string | undefined;
  reqUser: string | undefined;
  reqUserAgent: string | undefined;
}

const MyApp: FC<AppProps> & AppComposition = (props) => {
  const {
    Component,
    pageProps,
    emotionCache,
    reqSession,
    reqUser,
    reqUserAgent,
  } = props;

  return (
    <AppProviders
      dehydratedState={pageProps.dehydratedState}
      emotionCache={emotionCache}
      reqSession={reqSession}
      reqUser={reqUser}
      reqUserAgent={reqUserAgent}
    >
      <Component {...pageProps} />
    </AppProviders>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const req = appContext.ctx.req as
    | (IncomingMessage & { cookies: Record<string, string> })
    | undefined;
  let reqSession: string | undefined;
  let reqUser: string | undefined;
  const reqUserAgent = req?.headers['user-agent'];

  if (!!req && 'cookies' in req) {
    reqSession = req.cookies[COOKIE_STORAGE.session];
    reqUser = req.cookies[COOKIE_STORAGE.user];
  }

  return {
    ...appProps,
    reqSession,
    reqUser,
    reqUserAgent,
  };
};

export default appWithTranslation(MyApp, i18nConfig);
