/** @type import("next").I18NConfig */
const i18n = {
  defaultLocale: 'en-gb',
  locales: ['en-gb'],
  localeDetection: false, // disable automatic redirection on the user's preferred locale
};

/** @type import("next-i18next").UserConfig */
const next18nextConfig = {
  i18n,
  supportedLngs: ['en-gb'],
  lowerCaseLng: true,
  returnNull: false,
  returnEmptyString: false,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

module.exports = next18nextConfig;
