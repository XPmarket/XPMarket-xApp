import { XummSdk } from 'xumm-sdk';

import { ENV } from '@system/env/constants';

export const XUMM_SDK = new XummSdk(
  ENV.server.xummApiKey,
  ENV.server.xummApiSecret
);
