import { FC } from 'react';

import { CloseIcon } from '@xpmarket/xpm.ui.icons.close-icon';

import { SetActionAnimation } from '../types';
import { SwiperButtonBase } from './common/SwiperButtonBase';

interface Props {
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
  isAnimated: boolean;
  setAnimatedDirection: SetActionAnimation;
}

export const RejectButtonIcon: FC<Props> = (props) => {
  const { isActive, isDisabled, onClick, isAnimated, setAnimatedDirection } =
    props;

  return (
    <SwiperButtonBase
      isActive={isActive}
      variant={isDisabled ? 'disabled' : 'error'}
      onClick={onClick}
      isAnimated={isAnimated}
      setAnimatedDirection={setAnimatedDirection}
    >
      <CloseIcon
        sx={{
          color: 'inherit',
          fontSize: '33px',
        }}
      />
    </SwiperButtonBase>
  );
};
