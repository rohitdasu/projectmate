import { Markdown } from '@/components/Markdown';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
const Privacypolicy: NextPage = (content: any) => {
  return (
    <>
      <Head>
        <title>{`Projectmate | Privacy Policy`}</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <div className="mx-4 my-6 max-w-3xl md:m-auto md:my-16">
        <Link href="/">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="rounded-md border px-3 py-2"
          >
            <AiOutlineHome className="text-xl" />
          </motion.button>
        </Link>
        <Markdown content={content.content} />
      </div>
    </>
  );
};

Privacypolicy.getInitialProps = async () => {
  const content = await require('../../components/Markdown/privacy-policy.md');
  const data = content.default;
  return {
    content: data,
  };
};

export default Privacypolicy;
