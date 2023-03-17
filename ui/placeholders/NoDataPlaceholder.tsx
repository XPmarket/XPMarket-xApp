import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import {
  NoDataPlaceholder as XpmNoDataPlaceholder,
  NoDataPlaceholderProps as XpmNoDataPlaceholderProps,
} from '@xpmarket/xpm.ui.placeholders';

interface Props extends Omit<XpmNoDataPlaceholderProps, 'title'> {
  title?: string;
}

export const NoDataPlaceholder: FC<Props> = (props) => {
  const { title, ...restProps } = props;
  const { t } = useTranslation();

  return (
    <XpmNoDataPlaceholder
      title={title ?? t('common:errors.noData')}
      {...restProps}
    />
  );
};
