import React from 'react';
import NextLink from 'next/link';

import { useXApp } from '@templates/common/layout/page-layout/XAppContext';
import {
  LinkButton as XpmLinkButton,
  LinkButtonProps,
} from '@xpmarket/xpm.ui.buttons.link-button';

export const LinkButton = (props: LinkButtonProps): JSX.Element => {
  const { target, href, ...restProps } = props;
  const { xApp } = useXApp();
  const handleClick =
    target === '_blank'
      ? () => {
          xApp?.openBrowser({
            url: typeof href === 'string' ? href : href.href,
          });
        }
      : undefined;

  return (
    <XpmLinkButton
      onClick={handleClick}
      href={href}
      target={target}
      {...restProps}
      LinkComponent={NextLink}
    />
  );
};
