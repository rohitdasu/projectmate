import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import tw from 'twin.macro';
import Lottie from 'lottie-react-web';
import animation from '../public/animation-lottie.json';
import { IContributors, ContributorList, AuthModal } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { openModal } from '../slices/modalSlice';
import { changeMode } from '../slices/ModeSlice';

type Props = {
  contributors: IContributors[];
};

const Home: NextPage<Props> = ({ contributors }) => {
  const dispatch = useAppDispatch();
  const Mode = useAppSelector((state) => state.mode.mode);
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center ${
        Mode && 'bg-dark-mode'
      }`}
    >
      <Head>
        <title>projectmate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav
        className={`flex  h-24 w-full items-center bg-white justify-between border-t px-6 md:px-20 shadow-md ${
          Mode && '!bg-dark-mode'
        }`}
      >
        <span
          className={`text-2xl flex items-center  md:space-x-2 font-semibold font-mono text-gray-900 uppercase ${
            Mode && 'text-white'
          }`}
        >
          {Mode ? (
            <Image src="/dark-logo.svg" height={40} width={40} alt="logo" />
          ) : (
            <Image src="/logo.svg" height={40} width={40} alt="logo" />
          )}
          <p>
            project<span className="text-primary-color">mate</span>
          </p>
        </span>
        <div
          className={`hidden lg:flex justify-around items-center w-[400px] h-full ${
            Mode && 'text-white'
          }`}
        >
          <a
            href="#"
            className="text-[20px] flex items-center font-normal active"
          >
            Home
          </a>
          <a href="#" className="text-[20px] flex items-center font-normal ">
            Projects
          </a>
          <a href="#" className="text-[20px] flex items-center font-normal">
            About
          </a>
        </div>
        <div className="flex items-center justify-between space-x-2 w-[150px]">
          <a
            href="#"
            onClick={() => dispatch(changeMode())}
            className={`${
              Mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            } p-2 rounded-full flex items-center justify-center `}
          >
            {Mode ? (
              <Image
                src={'/light-mode.svg'}
                alt="night-mode"
                height={25}
                width={25}
              />
            ) : (
              <Image
                src={'/night-mode.svg'}
                alt="night-mode"
                height={20}
                width={20}
              />
            )}
          </a>
          <a
            href="https://github.com/rohitdasu/projectmate"
            target="_blank"
            rel="noreferrer"
            className={`${
              Mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            } p-2 rounded-full flex items-center justify-center `}
          >
            {Mode ? (
              <Image
                src="/dark-github.svg"
                alt="Vercel Logo"
                width={30}
                height={30}
              />
            ) : (
              <Image
                src="/github.svg"
                alt="Vercel Logo"
                width={30}
                height={30}
              />
            )}
          </a>
          <a
            href="https://discord.gg/M2BMPdku"
            target="_blank"
            rel="noreferrer"
            className={`${
              Mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            } p-2 rounded-full flex items-center justify-center `}
          >
            {Mode ? (
              <Image
                tw="ml-4"
                src="/dark-discord.svg"
                alt="Vercel Logo"
                width={30}
                height={30}
              />
            ) : (
              <Image
                tw="ml-4"
                src="/discord.svg"
                alt="Vercel Logo"
                width={30}
                height={30}
              />
            )}
          </a>
        </div>
      </nav>

      <main tw="flex   lg:w-full flex-1 ">
        <AuthModal />
        <div tw="flex  flex-col flex-1 text-center items-center justify-center lg:m-0 lg:w-1/2   lg:px-20">
          <h1
            className={`lg:leading-[82px] leading-normal font-bold  text-dark-color md:text-[55px] text-[40px]  capitalize ${
              Mode && '!text-white'
            }`}
          >
            A place where you find{' '}
            <span className="text-primary-color uppercase">OpenSource</span>{' '}
            Projects
          </h1>

          <p
            className={`mt-4 px-2   md:leading-[30px] leading-normal md:text-[20px] text-[17px] font-light text-gray-800 ${
              Mode && '!text-white'
            } `}
          >
            We will help you to find opensource project and contributors.
          </p>

          <button
            onClick={() => dispatch(openModal())}
            type="button"
            className="w-[170px]   h-[49px] mt-[20px] bg-[#2854EECC] text-white rounded-md"
          >
            JOIN US
          </button>
        </div>
        <div tw="hidden  lg:inline-flex mr-[2rem] ">
          <Lottie
            tw="h-[200px] w-[50px]"
            options={{
              animationData: animation,
            }}
          />
        </div>
      </main>
      <footer
        className={`flex  flex-col h-24 w-full items-center bg-white justify-center border-t px-6 lg:px-20 shadow-md ${
          Mode && '!bg-dark-mode border-t-0'
        } `}
      >
        <p className={`text-lg font-light  mb-2 pb-0 ${Mode && 'text-white'}`}>
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
