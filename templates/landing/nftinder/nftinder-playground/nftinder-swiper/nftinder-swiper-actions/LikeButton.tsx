import { FC } from 'react';

import { HeartIcon } from '@xpmarket/xpm.ui.icons.heart-icon';

import { SetActionAnimation } from '../types';
import { SwiperButtonBase } from './common/SwiperButtonBase';

interface Props {
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
  isAnimated: boolean;
  setAnimatedDirection: SetActionAnimation;
}

export const LikeButtonIcon: FC<Props> = (props) => {
  const { isActive, isDisabled, onClick, isAnimated, setAnimatedDirection } =
    props;

  return (
    <SwiperButtonBase
      isActive={isActive}
      variant={isDisabled ? 'disabled' : 'success'}
      onClick={onClick}
      isAnimated={isAnimated}
      setAnimatedDirection={setAnimatedDirection}
    >
      <HeartIcon
        sx={{
          color: 'inherit',
          fontSize: '75px',
        }}
      />
    </SwiperButtonBase>
  );
};
