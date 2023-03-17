import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import {
  ErrorPlaceholder as XpmErrorPlaceholder,
  ErrorPlaceholderProps as XpmErrorPlaceholderProps,
} from '@xpmarket/xpm.ui.placeholders';

interface Props extends Omit<XpmErrorPlaceholderProps, 'title'> {
  title?: string;
}

export const ErrorPlaceholder: FC<Props> = (props) => {
  const { title, ...restProps } = props;
  const { t } = useTranslation();

  return (
    <XpmErrorPlaceholder
      title={title ?? t('common:errors.unexpected')}
      {...restProps}
    />
  );
};
