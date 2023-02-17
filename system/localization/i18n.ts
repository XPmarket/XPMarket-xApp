import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { DEFAULT_LOCALE } from './constants';
import { I18nNamespaces, Translations } from './types';

export const makeTranslations = async (
  appLocale: string | undefined,
  namespaces: I18nNamespaces[] = []
): Promise<Translations> => {
  const locale = appLocale || DEFAULT_LOCALE;
  const translations = await serverSideTranslations(locale, [
    'common',
    'backend',
    ...namespaces,
  ]);

  return { translations, locale };
};
