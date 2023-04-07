import { FC, HTMLAttributes } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { ELLIPSIS_OVERFLOW } from '@xpmarket/xpm.system.theme';

import { TokenDropdownOption } from './types';

interface Props {
  option: TokenDropdownOption;
  renderProps: HTMLAttributes<HTMLElement>;
}

export const TokensDropdownOptionRow: FC<Props> = (props) => {
  const { option, renderProps } = props;

  return (
    <Box {...renderProps}>
      <Stack direction="row" spacing={1} alignItems="center" maxWidth={180}>
        <Typography fontWeight="fontWeightMedium">{option.code}</Typography>
        {option.title && (
          <Typography fontWeight="fontWeightRegular" sx={ELLIPSIS_OVERFLOW}>
            ({option.title})
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
