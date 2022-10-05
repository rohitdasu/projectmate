import { useTheme } from 'next-themes';

export const useIsDarkTheme = () => {
  const { theme } = useTheme();
  const dark_system_theme =
    theme === 'system' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || dark_system_theme;

  return isDark;
};
