import React from 'react';
import NextLink from 'next/link';

import {
  LinkButton as XpmLinkButton,
  LinkButtonProps,
} from '@xpmarket/xpm.ui.buttons.link-button';

export const LinkButton = (props: LinkButtonProps): JSX.Element => {
  return <XpmLinkButton LinkComponent={NextLink} {...props} />;
};
