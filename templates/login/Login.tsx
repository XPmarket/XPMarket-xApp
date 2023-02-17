import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';

import { Box, Stack } from '@mui/material';
import { APP_ROUTES } from '@system/route/constants';
import { ContentLayout } from '@templates/common/layout/content-layout/ContentLayout';
import { findRoute } from '@xpmarket/xpm.system.routes';

import { LoginCard } from './login-card/LoginCard';
import { LoginQueryParams } from './types';

export const Login: FC = () => {
  const { push, query } = useRouter();
  const queryParams = query as LoginQueryParams;
  const handleSuccess = useCallback(() => {
    if (
      typeof queryParams.redirectTo === 'string' &&
      !!findRoute(queryParams.redirectTo, APP_ROUTES)
    ) {
      push(queryParams.redirectTo);
    } else {
      push(APP_ROUTES.landing.path);
    }
  }, [push, queryParams]);

  return (
    <ContentLayout>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Box
          width={{
            xs: '100%',
            lg: '1100px',
          }}
          borderRadius={1}
          overflow="hidden"
        >
          <LoginCard onSuccess={handleSuccess} />
        </Box>
      </Stack>
    </ContentLayout>
  );
};
