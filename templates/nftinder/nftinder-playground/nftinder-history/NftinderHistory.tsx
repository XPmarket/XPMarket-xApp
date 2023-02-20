import { FC } from 'react';

import { Stack } from '@mui/material';
import { NftSwipeHistoryItem } from '@xpmarket/xpm.api.xpmarket';
import { useToggle } from '@xpmarket/xpm.system.use-toggle';

import { NftinderHistoryPanel } from './nftinder-history-panel/NftinderHistoryPanel';
import { NftinderHistoryExpander } from './NftinderHistoryExpander';

interface Props {
  historyList: NftSwipeHistoryItem[];
  isLoading: boolean;
  isAtBreakpoint: boolean;
}

export const NftinderHistory: FC<Props> = (props) => {
  const { historyList, isLoading, isAtBreakpoint } = props;
  const { isToggled, toggle } = useToggle(true);
  const isExpanded = isAtBreakpoint || isToggled;

  return (
    <Stack
      direction="row"
      spacing={1}
      width={isExpanded ? '100%' : undefined}
      maxWidth={isExpanded ? '560px' : undefined}
      height="654px"
      alignItems="center"
      overflow="hidden"
    >
      {!isAtBreakpoint && (
        <NftinderHistoryExpander isExpanded={isExpanded} onToggle={toggle} />
      )}
      {isExpanded && (
        <NftinderHistoryPanel
          historyList={historyList}
          isLoading={isLoading}
          isAtBreakpoint={isAtBreakpoint}
        />
      )}
    </Stack>
  );
};
