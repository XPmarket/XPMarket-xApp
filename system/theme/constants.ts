import { Sora } from 'next/font/google';

const soraFont = Sora({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
});

export const FONT_FAMILY = `${soraFont.style.fontFamily}, "Helvetica", "Arial", sans-serif`;
