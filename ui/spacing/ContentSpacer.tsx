import { FC, ReactNode } from 'react';

import { Box, BoxProps, Container, ContainerProps } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';

import { DEFAULT_PAGE_MAX_WIDTH } from './constants';

interface Props extends ContainerProps {
  children: ReactNode;
  contentProps?: BoxProps;
}

export const ContentSpacer: FC<Props> = (props) => {
  const {
    children,
    maxWidth = DEFAULT_PAGE_MAX_WIDTH,
    contentProps = {},
    sx,
    ...restContainerProps
  } = props;

  return (
    <Container
      maxWidth={maxWidth}
      sx={styles.merge('container', sx)}
      {...restContainerProps}
      className="spacer-container"
    >
      <Box className="spacer-content" {...contentProps}>
        {children}
      </Box>
    </Container>
  );
};

const styles = new SxStyles({
  container: {
    px: {
      xs: 1,
      sm: 2,
    },
  },
});
