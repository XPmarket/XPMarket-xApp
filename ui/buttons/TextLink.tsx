import React from 'react';
import NextLink from 'next/link';

import { useXApp } from '@templates/common/layout/page-layout/XAppContext';
import {
  TextLink as XpmTextLink,
  TextLinkProps,
} from '@xpmarket/xpm.ui.buttons.text-link';

export const TextLink = (props: TextLinkProps): JSX.Element => {
  const { target, href, ...restProps } = props;
  const { xApp } = useXApp();
  const handleClick =
    target === '_blank' && href
      ? () => {
          xApp?.openBrowser({
            url: typeof href === 'string' ? href : href.href,
          });
        }
      : undefined;

  return (
    <XpmTextLink
      component={NextLink}
      onClick={handleClick}
      href={href}
      target={target}
      {...restProps}
    />
  );
};
