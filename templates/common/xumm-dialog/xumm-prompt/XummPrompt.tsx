import { FC } from 'react';
import { CreatedPayload } from 'xumm-sdk/dist/src/types';

import { useThemeConfig } from '@xpmarket/xpm.system.theme-provider';

import { DesktopPrompt } from './DesktopPrompt';
import { MobilePrompt } from './MobilePrompt';

interface Props {
  data: CreatedPayload | undefined;
  isError: boolean;
  isLoading: boolean;
  hasExpired: boolean;
}

export const XummPrompt: FC<Props> = (props) => {
  const { isLoading, data, hasExpired, isError } = props;
  const { isMobileAgent } = useThemeConfig();

  if (isMobileAgent) {
    return (
      <MobilePrompt
        data={data}
        isLoading={isLoading}
        isError={isError}
        hasExpired={hasExpired}
      />
    );
  }

  return (
    <DesktopPrompt
      data={data}
      isLoading={isLoading}
      isError={isError}
      hasExpired={hasExpired}
    />
  );
};
