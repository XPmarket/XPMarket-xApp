import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { SxStyles } from '@xpmarket/xpm.system.theme';
import { LinearLoader } from '@xpmarket/xpm.ui.loaders.linear-loader';

export const ProgressBar: FC = () => {
  const [showProgress, toggleProgress] = useState<boolean>(false);
  const { events } = useRouter();

  useEffect(() => {
    const hideProgress = () => toggleProgress(false);
    const displayProgress = () => toggleProgress(true);

    events.on('routeChangeStart', displayProgress);
    events.on('routeChangeComplete', hideProgress);
    events.on('routeChangeError', hideProgress);

    return () => {
      events.off('routeChangeStart', displayProgress);
      events.off('routeChangeComplete', hideProgress);
      events.off('routeChangeError', hideProgress);
    };
  }, [events]);

  if (!showProgress) {
    return null;
  }

  return <LinearLoader sx={styles.getValue('progressIndicator')} />;
};

const styles = new SxStyles({
  progressIndicator: {
    position: 'absolute',
    bottom: -4,
    left: 0,
  },
});
