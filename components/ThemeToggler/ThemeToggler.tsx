import { FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { RiMoonCloudyLine } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { framer_theme } from './framer';
import { useIsDarkTheme } from './utils';

export const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const isDark = useIsDarkTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className="flex h-[2.939rem] w-[2.939rem] items-center justify-center overflow-hidden rounded-md border-black text-[1.6rem] text-gray-500 shadow-border-shadow transition-all hover:border-2 hover:text-gray-900 dark:border-white dark:text-gray-400 hover:dark:!text-gray-100"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span {...framer_theme} key={theme}>
          {isDark ? <RiMoonCloudyLine /> : <FiSun />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
