import { Theme } from '@mui/material/styles';
import { isClient } from 'src/utils';
import dark from './data/dark';
import defaultTheme from './data/default';
import light from './data/light';

export default defaultTheme;
export type ThemeType = Theme;
export type ThemeNamesType = 'default' | 'dark' | 'light';

export const getTheme = (name: ThemeNamesType): Theme => {
  switch (name) {
    case 'light':
      return light;
    case 'dark':
      return dark;
    default:
      return defaultTheme;
  }
};

export const themeName = 'theme';
export const getPreferredTheme = () => {
  let preferredTheme = defaultTheme;
  if (isClient) {
    const value = localStorage.getItem(themeName);
    const storedTheme = value ? getTheme(value as ThemeNamesType) : null;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const darkTheme = getTheme('dark');
    // first priority is theme set in localStorage and then fallback to prefers-color-scheme
    preferredTheme = storedTheme || (prefersDark && darkTheme) || defaultTheme;
  }
  return preferredTheme;
};
