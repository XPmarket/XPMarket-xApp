import { SYMBOLS } from '@xpmarket/xpm.system.placeholders';

export const makeXummSignPath = (uuid: string | undefined): string => {
  if (!uuid) {
    return SYMBOLS.emptyHref;
  }

  return 'xumm://xumm.app/sign/' + uuid;
};
