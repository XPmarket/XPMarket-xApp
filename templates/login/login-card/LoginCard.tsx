import { FC } from 'react';

import { Stack } from '@mui/material';
import { Card } from '@xpmarket/xpm.ui.cards.card';

import { LoginPromptCard } from './login-prompt/LoginPrompt';

interface Props {
  onSuccess: () => void; // Callbacks have to be memoized (referenced in `useEffect`)
}

export const LoginCard: FC<Props> = (props) => {
  const { onSuccess } = props;

  return (
    <Card sx={{ p: 0, overflow: 'auto' }}>
      <Stack direction="row" justifyContent="center">
        <LoginPromptCard onSuccess={onSuccess} />
      </Stack>
    </Card>
  );
};
