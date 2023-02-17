import { ReactElement } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import createEmotionServer from '@emotion/server/create-instance';
import { STATIC_IMAGES } from '@system/constants';
import { createEmotionCache } from '@xpmarket/xpm.system.theme-provider';

interface Props {
  emotionStyleTags: ReactElement;
}

class CustomDocument extends Document<Props> {
  render(): JSX.Element {
    const { emotionStyleTags } = this.props;

    return (
      <Html>
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="XPmarket" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="format-detection" content="date=no" />
          <meta name="format-detection" content="address=no" />
          <meta name="format-detection" content="email=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="none" />
          <meta
            name="theme-color"
            content="#FFFFFF"
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content="#121021"
            media="(prefers-color-scheme: dark)"
          />
          <meta name="apple-mobile-web-app-title" content="xpmarket" />
          <meta name="application-name" content="xpmarket" />
          <meta name="msapplication-TileColor" content="#603cba" />

          <link rel="shortcut icon" href={STATIC_IMAGES.favicon.ico} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={STATIC_IMAGES.favicon.appleTouch}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={STATIC_IMAGES.favicon.square32x32}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={STATIC_IMAGES.favicon.square16x16}
          />
          <link rel="icon" href={STATIC_IMAGES.favicon.ico} />
          <link
            rel="mask-icon"
            href={STATIC_IMAGES.favicon.safariPinned}
            color="#5bbad5"
          />
          <link rel="manifest" href="/site.webmanifest" />

          <meta name="emotion-insertion-point" content="" />
          {emotionStyleTags}

          {/* CloudFlare's Zaraz script */}
          <Script src="/cdn-cgi/zaraz/i.js" referrerPolicy="origin" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async (ctx) => {
  const view = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = renderPageFn;

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };

  function renderPageFn() {
    return view({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          const mergedProps = { ...props, emotionCache: cache };

          return <App {...mergedProps} />;
        },
    });
  }
};

export default CustomDocument;
