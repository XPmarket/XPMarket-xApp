import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { Box, Stack, Typography } from '@mui/material';
import { LeftKeyboardArrowIcon } from '@xpmarket/xpm.ui.icons.left-keyboard-arrow-icon';
import { RightKeyboardArrowIcon } from '@xpmarket/xpm.ui.icons.right-keyboard-arrow-icon';

export const NftinderSwiperHelperText: FC = () => {
  const { t } = useTranslation();

  return (
    <Typography
      fontSize={14}
      fontWeight="fontWeightBold"
      color="secondary.main"
    >
      <Stack
        component="span"
        direction="row"
        spacing={0.5}
        alignItems="center"
        justifyContent="center"
      >
        <Box component="span">{t('nftinder:swiper.useArrowsPre')}</Box>
        <LeftKeyboardArrowIcon />
        <RightKeyboardArrowIcon />
        <Box component="span">{t('nftinder:swiper.useArrowsPost')}</Box>
      </Stack>
    </Typography>
  );
};
