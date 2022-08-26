import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import tw from 'twin.macro';
import Lottie from 'lottie-react-web';
import animation from '../public/animation-lottie.json';
import AuthModal from '../components/AuthModal';
import { useState } from 'react';
import ContributorList from '../components/contributors';
import { IContributors } from '../interfaces';

type Props = {
  contributors: IContributors[];
};

const Home: NextPage<Props> = ({ contributors }) => {
  let [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  return (
    <div tw="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>projectmate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav tw="flex h-24 w-full items-center bg-white justify-between border-t px-6 md:px-20 shadow-md">
        <span tw="text-2xl font-semibold font-mono text-gray-900">
          projectmate
        </span>

        <div tw="flex items-center justify-between w-[100px]">
          <a
            href="https://github.com/rohitdasu/projectmate"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/github.svg" alt="Vercel Logo" width={40} height={40} />
          </a>
          <a
            href="https://discord.gg/M2BMPdku"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              tw="ml-4"
              src="/discord.svg"
              alt="Vercel Logo"
              width={40}
              height={40}
            />
          </a>
        </div>
      </nav>

      <main tw="flex  lg:w-full flex-1 text-center">
        <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <div tw="flex flex-col items-center justify-center lg:m-0 lg:w-1/2  px-4 lg:px-20">
          <h1 tw="text-4xl font-bold font-bold text-gray-900">
            Welcome to projectmate - a place where you find project mates
          </h1>

          <p tw="mt-6 text-2xl font-normal text-gray-800">
            Find contributors and find projects to contribute
          </p>

          <button
            onClick={openModal}
            type="button"
            tw="lg:mt-16 mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-8 py-3 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            JOIN US
          </button>
        </div>
        <div tw="hidden lg:inline-flex  lg:px-20">
          <Lottie
            tw="h-[200px] w-[100px]"
            options={{
              animationData: animation,
            }}
          />
        </div>
      </main>
      <footer tw="flex flex-col h-24 w-full items-center bg-white justify-center border-t px-6 lg:px-20 shadow-md">
        <p tw="text-lg font-light text-gray-800 mb-2 pb-0">
          Shout-out to our contributors
        </p>

        <div tw="flex items-center justify-around w-[80%] lg:w-1/5">
          <ContributorList contributors={contributors} />
        </div>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetch(
    'https://api.github.com/repos/rohitdasu/projectmate/contributors'
  );
  const json = await data.json();

  return {
    props: {
      contributors: json,
    },
  };
};
