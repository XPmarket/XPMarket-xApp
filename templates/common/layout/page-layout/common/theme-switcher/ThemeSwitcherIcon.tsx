import { FC } from 'react';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { PaletteMode } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';

interface Props {
  mode?: PaletteMode;
}

export const ThemeSwitcherIcon: FC<Props> = (props) => {
  const { mode } = props;

  if (mode === 'dark') {
    return <LightModeIcon sx={styles.getValue('icon')} />;
  }

  return <DarkModeIcon sx={styles.getValue('icon')} />;
};

const styles = new SxStyles({
  icon: {
    fontSize: '20px',
    color: 'inherit',
  },
});
