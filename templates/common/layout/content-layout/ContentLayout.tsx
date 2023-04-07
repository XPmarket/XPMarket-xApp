import { FC, ReactNode } from 'react';

import { BoxProps, Breakpoint, Stack, Theme, useTheme } from '@mui/material';
import { SxObject, SxStyles } from '@xpmarket/xpm.system.theme';
import { DEFAULT_PAGE_MAX_WIDTH } from '@ui/spacing/constants';
import { ContentSpacer } from '@ui/spacing/ContentSpacer';

export interface ContentLayoutProps {
  children: ReactNode;
  sx?: SxObject;
  maxWidth?: Breakpoint | BoxProps['maxWidth'];
}

export const ContentLayout: FC<ContentLayoutProps> = (props) => {
  const { children, sx, maxWidth = DEFAULT_PAGE_MAX_WIDTH } = props;
  const theme = useTheme();
  const isSystemBreakpoint = validateSystemBreakpoint(maxWidth, theme);
  const dynamicStyles = styles(maxWidth);

  return (
    <ContentSpacer
      sx={dynamicStyles.merge('spacer', sx)}
      maxWidth={isSystemBreakpoint ? maxWidth : false}
    >
      <Stack className="content-layout-wrapper" spacing={3}>
        {children}
      </Stack>
    </ContentSpacer>
  );
};

const validateSystemBreakpoint = (
  maxWidth: Breakpoint | BoxProps['maxWidth'] | undefined,
  theme: Theme
): maxWidth is Breakpoint => {
  return (
    typeof maxWidth === 'string' &&
    Object.keys(theme.breakpoints.values).includes(maxWidth)
  );
};

const styles = (maxWidth: BoxProps['maxWidth'] | undefined) =>
  new SxStyles({
    spacer: {
      maxWidth,

      '.spacer-content': {
        py: 4,
      },
    },
  });
