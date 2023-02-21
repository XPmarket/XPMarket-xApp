import { FC } from 'react';
import { CreatedPayload } from 'xumm-sdk/dist/src/types';

import { MobilePrompt } from './MobilePrompt';

interface Props {
  data: CreatedPayload | undefined;
  isError: boolean;
  isLoading: boolean;
  hasExpired: boolean;
}

export const XummPrompt: FC<Props> = (props) => {
  const { isLoading, data, hasExpired, isError } = props;

  return (
    <MobilePrompt
      data={data}
      isLoading={isLoading}
      isError={isError}
      hasExpired={hasExpired}
    />
  );
};
