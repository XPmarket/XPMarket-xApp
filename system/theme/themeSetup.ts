import { mergeDeepRight } from 'ramda';

import { createTheme, PaletteMode, Theme } from '@mui/material';
import {
  customMuiTheme,
  setup,
} from '@xpmarket/xpm.system.theme-provider/dist/config/themeSetup';

import { SORA_FONT } from './constants';

export const appMuiTheme = (mode: PaletteMode): Theme => {
  const xpmTheme = customMuiTheme(mode);
  const typographyOverrides = {
    fontFamily: `${SORA_FONT.style.fontFamily}, "Helvetica", "Arial", sans-serif`,
  };
  const componentOverrides = {
    MuiCssBaseline: {
      styleOverrides: {
        /** React-toastify default background overrides */
        '.Toastify__toast': {
          fontSize: '13px',
          fontWeight: xpmTheme.typography.fontWeightRegular,
          color: `${xpmTheme.palette.static.white} !important`,

          '.Toastify__close-button': {
            color: `${xpmTheme.palette.static.white} !important`,
          },
          '.Toastify__progress-bar': {
            background: `${xpmTheme.palette.static.white} !important`,
          },
          svg: {
            fill: `${xpmTheme.palette.static.white} !important`,
          },
        },
        '.Toastify__toast--success': {
          background: `linear-gradient(90.37deg, ${xpmTheme.palette.success.dark} 3.4%, ${xpmTheme.palette.success.light} 97.93%) !important`,
        },
        '.Toastify__toast--error': {
          background: `linear-gradient(90.37deg, ${xpmTheme.palette.error.dark} 3.4%, ${xpmTheme.palette.error.light} 97.93%) !important`,
        },
        '.Toastify__toast--info': {
          background: `linear-gradient(90.37deg, ${xpmTheme.palette.primary.dark} 3.4%, ${xpmTheme.palette.primary.light} 97.93%) !important`,
        },
        '.Toastify__toast--warning': {
          background: `linear-gradient(90.37deg, ${xpmTheme.palette.warning.dark} 3.4%, ${xpmTheme.palette.warning.light} 97.93%) !important`,
        },
      },
    },
  };

  const appTheme = setup(mode);

  appTheme.typography = mergeDeepRight(
    appTheme.typography ?? {},
    typographyOverrides
  );
  appTheme.components = mergeDeepRight(
    appTheme.components ?? {},
    componentOverrides
  );

  return createTheme(appTheme);
};
