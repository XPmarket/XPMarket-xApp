import { FC } from 'react';

import { Box, PaletteMode } from '@mui/material';
import { BASE_DOMAINS } from '@xpmarket/xpm.system.routes';
import { SxObject, SxStyles } from '@xpmarket/xpm.system.theme';
import { XpmarketLogoTextIcon } from '@xpmarket/xpm.ui.icons.xpmarket-logo-text-icon';

import { useXApp } from './XAppContext';

interface Props {
  variant: PaletteMode;
  sx?: SxObject;
}

export const AppLogoLink: FC<Props> = (props) => {
  const { variant, sx } = props;
  const dynamicStyles = styles(variant);
  const { xApp } = useXApp();

  return (
    <Box sx={dynamicStyles.merge('container', sx)} onClick={handleClick}>
      <XpmarketLogoTextIcon sx={dynamicStyles.getValue('icon')} />
    </Box>
  );

  function handleClick(): void {
    xApp?.openBrowser({ url: BASE_DOMAINS.xpmarket });
  }
};

const styles = (variant: PaletteMode) =>
  new SxStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    icon: {
      color: variant === 'dark' ? 'static.white' : 'primary.main',
    },
  });
