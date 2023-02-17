import { TFunction } from 'next-i18next';

import { YupError } from '@xpmarket/xpm.ui.inputs.types';

export const getYupErrorMessage = (
  error: YupError | false,
  t: TFunction
): string => {
  if (error && error.message) {
    if (typeof error?.message !== 'string') {
      return t(error.message.key, { ...error.message.values });
    }

    if (typeof error?.message === 'string') {
      return t(error.message);
    }
  }

  return '';
};
