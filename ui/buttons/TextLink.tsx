import React from 'react';
import NextLink from 'next/link';

import {
  TextLink as XpmTextLink,
  TextLinkProps,
} from '@xpmarket/xpm.ui.buttons.text-link';

export const TextLink = (props: TextLinkProps): JSX.Element => {
  return <XpmTextLink component={NextLink} {...props} />;
};
