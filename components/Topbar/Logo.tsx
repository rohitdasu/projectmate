import { motion } from 'framer-motion';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <motion.span
        whileTap={{ scale: 0.9 }}
        className="flex items-center font-mono text-2xl font-semibold uppercase cursor-pointer md:space-x-2 text-foreground-1"
      >
        <p>
          project<span className="text-primary-color">mate</span>
        </p>
      </motion.span>
    </Link>
  );
};
