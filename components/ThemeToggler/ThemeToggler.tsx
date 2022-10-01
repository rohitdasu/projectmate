import { FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { RiMoonCloudyLine } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { framer_theme } from './framer';

export const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const dark_system_theme =
    theme === 'system' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || dark_system_theme;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className="flex overflow-hidden rounded-md p-[0.67rem] text-[1.6rem] shadow-border-shadow"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span {...framer_theme} className="flex" key={theme}>
          {isDark ? <RiMoonCloudyLine /> : <FiSun />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
