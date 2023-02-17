const DEFAULT_LOCALE = 'en-gb';
const AVAILABLE_LOCALES = ['en-gb'];

const i18nConfig = {
  DEFAULT_LOCALE,
  AVAILABLE_LOCALES,
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: AVAILABLE_LOCALES,
    lowerCaseLng: true,
    returnNull: false,
    returnEmptyString: false,
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
};

module.exports = i18nConfig;
