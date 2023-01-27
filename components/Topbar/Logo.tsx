import { motion } from 'framer-motion';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <motion.span
        whileTap={{ scale: 0.9 }}
        className="flex cursor-pointer items-center font-mono text-2xl font-semibold uppercase hover:animate-pulse md:space-x-2"
      >
        <p>
          project<span className="text-primary-color">mate</span>
        </p>
      </motion.span>
    </Link>
  );
};
