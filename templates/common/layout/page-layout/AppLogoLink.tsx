import { FC } from 'react';

import { Box, PaletteMode } from '@mui/material';
import { SxStyles, SxTheme } from '@xpmarket/xpm.system.theme';
import { XpmarketLogoTextIcon } from '@xpmarket/xpm.ui.icons.xpmarket-logo-text-icon';

interface Props {
  variant: PaletteMode;
  sx?: SxTheme;
}

export const AppLogoLink: FC<Props> = (props) => {
  const { variant, sx } = props;
  const dynamicStyles = styles(variant);

  return (
    <Box sx={dynamicStyles.merge('container', sx)}>
      <XpmarketLogoTextIcon sx={dynamicStyles.getValue('icon')} />
    </Box>
  );
};

const styles = (variant: PaletteMode) =>
  new SxStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      color: variant === 'dark' ? 'static.white' : 'primary.main',
    },
  });
