import { FC, ReactNode } from 'react';

import { SxStyles, SxTheme } from '@xpmarket/xpm.system.theme';
import { Card } from '@xpmarket/xpm.ui.cards.card';

interface Props {
  children: ReactNode;
  sx?: SxTheme;
}

export const NftinderSwipeCardContainer: FC<Props> = (props) => {
  const { children, sx } = props;

  return (
    <Card sx={styles.merge('card', sx)} elevation={0}>
      {children}
    </Card>
  );
};

const styles = new SxStyles({
  card: {
    width: '100%',
    aspectRatio: '1',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: '1',
    p: 0,
  },
});
