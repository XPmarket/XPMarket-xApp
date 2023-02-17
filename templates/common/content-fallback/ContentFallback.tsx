import { FC, ReactNode } from 'react';

import { CardContent, Stack, Typography } from '@mui/material';
import { SxStyles, SxTheme } from '@xpmarket/xpm.system.theme';
import { DEFAULT_PAGE_SPACING } from '@ui/spacing/constants';
import { ContentSpacer } from '@ui/spacing/ContentSpacer';

interface Props {
  title: string;
  description: string;
  info: string;
  action: ReactNode;
  icon: ReactNode;
  sx?: SxTheme;
}

export const ContentFallback: FC<Props> = (props) => {
  const { title, description, info, action, icon, sx } = props;

  return (
    <ContentSpacer
      contentProps={DEFAULT_PAGE_SPACING}
      sx={styles.merge('root', sx)}
    >
      <CardContent sx={styles.getValue('cardContent')}>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={4}
          width="100%"
          minHeight="550px"
          maxWidth="desktopLimit"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            spacing={2}
            width="100%"
            maxWidth="500px"
            alignItems="flex-start"
          >
            <Stack>
              <Typography
                fontSize={{
                  xs: '50px',
                  md: '60px',
                }}
                lineHeight={{
                  xs: '60px',
                  md: '70px',
                }}
                fontWeight="fontWeightBold"
              >
                {title}
              </Typography>
              <Typography
                fontSize={{
                  xs: '24px',
                  md: '26px',
                }}
                fontWeight="fontWeightBold"
              >
                {description}
              </Typography>
            </Stack>
            <Stack spacing={3} alignItems="flex-start">
              <Typography
                color="secondary.main"
                fontSize={14}
                fontWeight="fontWeightRegular"
              >
                {info}
              </Typography>
              {action}
            </Stack>
          </Stack>
          {icon}
        </Stack>
      </CardContent>
    </ContentSpacer>
  );
};

const styles = new SxStyles({
  root: {
    height: '100%',

    '.spacer-content': {
      height: 'inherit',
    },
  },
  cardContent: {
    display: 'flex',
    width: '100%',
    height: 'inherit',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
