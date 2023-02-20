import { FC } from 'react';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { ButtonBase } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { makeCircle } from '@xpmarket/xpm.ui.shapes';

interface Props {
  isExpanded: boolean;
  onToggle: () => void;
}

export const NftinderHistoryExpander: FC<Props> = (props) => {
  const { isExpanded, onToggle } = props;
  const dynamicStyles = styles(isExpanded);

  return (
    <ButtonBase sx={dynamicStyles.getValue('container')} onClick={onToggle}>
      <ChevronLeftRoundedIcon sx={dynamicStyles.getValue('icon')} />
    </ButtonBase>
  );
};

const styles = (isExpanded: Props['isExpanded']) =>
  new SxStyles({
    container: {
      zIndex: 1,
      ...makeCircle(32),
      bgcolor: (theme) =>
        theme.palette.mode === 'dark'
          ? theme.palette.dark.main
          : theme.palette.static.seashell,
    },
    icon: {
      color: (theme) =>
        theme.palette.mode === 'dark'
          ? theme.palette.static.philippineSilver
          : theme.palette.static.mediumEbony,
      transform: `rotate(${isExpanded ? '180deg' : undefined})`,
    },
  });
