import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { FormHelperText } from '@mui/material';
import { capitalizeText } from '@xpmarket/xpm.system.text';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { YupError } from '@xpmarket/xpm.ui.inputs.types';

import { getYupErrorMessage } from './helpers';

interface Props {
  error: false | YupError;
}

export const ErrorText: FC<Props> = (props) => {
  const { error } = props;
  const { t } = useTranslation();

  if (error) {
    const errorText = getYupErrorMessage(error, t);
    const capitalizedError = capitalizeText(errorText);

    return (
      <FormHelperText sx={styles.getValue('root')}>
        {capitalizedError}
      </FormHelperText>
    );
  }

  return null;
};

const styles = new SxStyles({
  root: {
    color: 'error.main',
  },
});
