import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import Lottie from 'lottie-react';
import comingSoonAnimation from 'public/animations/comingSoon.json';
import { motion } from 'framer-motion';

const Blog: NextPage = () => {
  return (
    <SharedLayout title="Blog">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center"
      >
        <Lottie
          className="w-full md:w-[50%]"
          animationData={comingSoonAnimation}
        />
      </motion.div>
    </SharedLayout>
  );
};

export default Blog;
