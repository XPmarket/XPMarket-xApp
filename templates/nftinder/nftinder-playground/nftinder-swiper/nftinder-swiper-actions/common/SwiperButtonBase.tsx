import { AnimationEvent, FC, ReactNode } from 'react';

import { ButtonBase, darken, lighten, Theme } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { makeCircle } from '@xpmarket/xpm.ui.shapes';

import { SetActionAnimation } from '../../types';

interface Props {
  isActive: boolean;
  children: ReactNode;
  variant: 'success' | 'error' | 'disabled';
  onClick: () => void;
  isAnimated: boolean;
  setAnimatedDirection: SetActionAnimation;
}

export const SwiperButtonBase: FC<Props> = (props) => {
  const {
    isActive,
    children,
    variant,
    onClick,
    isAnimated,
    setAnimatedDirection,
  } = props;
  const dynamicStyles = styles(isActive, variant);

  const animationEndHandler = (event: AnimationEvent<HTMLButtonElement>) => {
    const { animationName } = event;

    if (animationName === 'bounce') {
      setAnimatedDirection(undefined);
    }
  };

  return (
    <ButtonBase
      onClick={onClick}
      sx={dynamicStyles.getValue('root')}
      onAnimationEnd={(event) => animationEndHandler(event)}
      className={isAnimated ? 'animated' : undefined}
    >
      {children}
    </ButtonBase>
  );
};

const getVariantColor = (theme: Theme, variant: Props['variant']): string => {
  if (variant === 'disabled') {
    return theme.palette.action.disabled;
  }
  if (variant === 'error') {
    return theme.palette.error.main;
  }

  return theme.palette.success.main;
};

const getBackgroundColor = (
  theme: Theme,
  isActive: Props['isActive'],
  variant: Props['variant']
): string => {
  const variantColor = getVariantColor(theme, variant);

  if (variant === 'disabled') {
    return variantColor;
  }
  if (theme.palette.mode === 'dark') {
    return isActive ? variantColor : darken(variantColor, 0.75);
  }

  return isActive ? variantColor : lighten(variantColor, 0.9);
};

const getColor = (
  theme: Theme,
  isActive: Props['isActive'],
  variant: Props['variant']
): string => {
  const variantColor = getVariantColor(theme, variant);

  if (variant === 'disabled') {
    return variantColor;
  }
  if (theme.palette.mode === 'dark') {
    return isActive ? darken(variantColor, 0.75) : variantColor;
  }

  return isActive ? lighten(variantColor, 0.9) : variantColor;
};

const getBorderColor = (
  theme: Theme,
  isActive: Props['isActive'],
  variant: Props['variant']
): string => {
  const variantColor = getVariantColor(theme, variant);

  if (variant === 'disabled') {
    return variantColor;
  }
  if (theme.palette.mode === 'dark') {
    return darken(variantColor, isActive ? 0.4 : 0.8);
  }

  return lighten(variantColor, isActive ? 0.95 : 0.85);
};

const styles = (isActive: Props['isActive'], variant: Props['variant']) =>
  new SxStyles({
    root: {
      ...makeCircle(96),
      pointerEvents: variant === 'disabled' ? 'none' : undefined,
      bgcolor: (theme) => getBackgroundColor(theme, isActive, variant),
      border: (theme) =>
        `thin solid ${getBorderColor(theme, isActive, variant)}`,
      color: (theme) => getColor(theme, isActive, variant),
      transition: 'all 0.1s ease-in',

      '&.animated': {
        animation: 'bounce 0.3s ease-in-out 0s',

        '@keyframes bounce': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      '&:active': {
        bgcolor: (theme) => getBackgroundColor(theme, true, variant),
        border: (theme) => `thin solid ${getBorderColor(theme, true, variant)}`,
        color: (theme) => getColor(theme, true, variant),
      },
      '@media (hover: hover)': {
        '&:hover': {
          bgcolor: (theme) => getBackgroundColor(theme, true, variant),
          border: (theme) =>
            `thin solid ${getBorderColor(theme, true, variant)}`,
          color: (theme) => getColor(theme, true, variant),
        },
      },
    },
  });
