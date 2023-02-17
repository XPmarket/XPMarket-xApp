import { FC, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

import { IconButton, Stack } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { useThemeConfig } from '@xpmarket/xpm.system.theme-provider';

import { ThemeSwitcherIcon } from './ThemeSwitcherIcon';

interface Props {
  title?: ReactNode;
}

export const ThemeSwitcher: FC<Props> = (props) => {
  const { title } = props;
  const { mode, toggleThemeMode } = useThemeConfig();
  const { t } = useTranslation();

  if (title) {
    return (
      <Stack
        width="fit-content"
        direction="row"
        spacing={1}
        sx={styles.getValue('clickable')}
        alignItems="center"
        onClick={handleClick}
      >
        <ThemeSwitcherIcon mode={mode} />
        {title}
      </Stack>
    );
  }

  return (
    <IconButton
      aria-label={t('common:ariaLabels.close')}
      size="small"
      onClick={handleClick}
      color="inherit"
    >
      <ThemeSwitcherIcon mode={mode} />
    </IconButton>
  );

  function handleClick(): void {
    toggleThemeMode();
  }
};

const styles = new SxStyles({
  clickable: {
    cursor: 'pointer',
  },
});
