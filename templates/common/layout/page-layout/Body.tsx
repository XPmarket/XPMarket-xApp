import { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { BodyFallback } from '@templates/common/body-fallback/BodyFallback';
import { CircularLoader } from '@xpmarket/xpm.ui.loaders.circular-loader';

interface Props {
  children: ReactNode;
  showContentLoader?: boolean;
}

export const Body: FC<Props> = (props) => {
  const { children, showContentLoader } = props;

  return (
    <ErrorBoundary FallbackComponent={BodyFallback}>
      {showContentLoader ? <CircularLoader isCentered /> : children}
    </ErrorBoundary>
  );
};
