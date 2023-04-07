import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { Markdown } from '@/components';
import { motion } from 'framer-motion';
import { AiOutlineHome } from 'react-icons/ai';
const Privacypolicy: NextPage = (content: any) => {
  return (
    <>
      <Head>
        <title>{`Projectmate | Privacy Policy`}</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <div className="mx-4 w-full py-6 md:mx-auto md:w-1/2 md:py-16">
        <Link href="/">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="rounded-md border-2 px-3 py-2"
          >
            <AiOutlineHome className="text-xl text-gray-100" />
          </motion.button>
        </Link>
        <Markdown content={content.data} />
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const content = await require('@/components');
  const data = content.default;
  return {
    props: {
      data,
    },
  };
};

export default Privacypolicy;
