import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { FormHelperText } from '@mui/material';

interface Props {
  hasNoBalance: boolean;
}

export const ErrorReason: FC<Props> = (props) => {
  const { hasNoBalance } = props;
  const { t } = useTranslation();

  if (hasNoBalance) {
    return (
      <FormHelperText error>{t('common:errors.noBalance')}</FormHelperText>
    );
  }

  return null;
};
