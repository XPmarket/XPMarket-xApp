import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { CreatedPayload } from 'xumm-sdk/dist/src/types';

import { Box } from '@mui/material';
import { STATIC_IMAGES } from '@system/constants';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { StaticImage } from '@xpmarket/xpm.ui.gallery.static-image';

interface Props {
  data: CreatedPayload | undefined;
  isExpired: boolean | null;
}

export const QrCode: FC<Props> = (props) => {
  const { data, isExpired } = props;
  const { t } = useTranslation();
  const isValidQr = !!data && (!isExpired || isExpired === null);
  const dynamicStyles = styles(isValidQr);

  return (
    <Box sx={dynamicStyles.getValue('wrapper')}>
      <Box sx={dynamicStyles.getValue('container')}>
        <StaticImage
          src={isValidQr ? data.refs.qr_png : STATIC_IMAGES.qrCode}
          alt={t('common:walletDialog.alt')}
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
};

const styles = (isValidQr: boolean) =>
  new SxStyles({
    wrapper: {
      p: 1,
      borderRadius: '8px',
      bgcolor: 'static.white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isValidQr ? 1 : 0.3,
    },
    container: {
      position: 'relative',
      width: 194,
      aspectRatio: '1',
    },
  });
