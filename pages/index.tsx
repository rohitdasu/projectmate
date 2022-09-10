import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import animation from '../public/animation-lottie.json';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AuthModal, Navbar } from '../components';
import { openModal } from '../store/slices/sliceModal';
import 'twin.macro';

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.mode.mode);
  const userState = useAppSelector((state) => state.user.isLogged);

  return (
    <div
      className={`flex min-h-screen flex-col items-center  ${
        mode && 'bg-dark-mode'
      }`}
    >
      <Head>
        <title>Projectmate | Home</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Navbar active={'home'} />
      <main tw="flex mt-[5rem] lg:w-full flex-1 ">
        <Toaster />
        <AuthModal title={'Continue with your social accounts.'} />
        <div tw="flex flex-col px-[2px] flex-1 text-center md:text-left justify-center lg:m-0 lg:w-1/2 lg:px-20">
          <h1
            className={`lg:leading-[82px] leading-normal font-bold  text-dark-color md:text-[55px] text-[40px]  capitalize ${
              mode && '!text-white'
            }`}
          >
            A place where you find{' '}
            <span className="text-primary-color uppercase">OpenSource</span>{' '}
            Projects
          </h1>

          <p
            className={`mt-4    md:leading-[30px] leading-normal md:text-[20px] text-[17px] font-light text-gray-800 ${
              mode && '!text-white'
            } `}
          >
            We will help you to find opensource project and contributors.
          </p>

          {userState ? (
            <button
              onClick={() => router.push('/projects')}
              type="button"
              tw="border border-white w-[170px] mx-auto md:mx-0 font-semibold h-[49px] mt-[20px] bg-secondary-color text-white rounded-md"
            >
              Explore Projects
            </button>
          ) : (
            <button
              onClick={() => dispatch(openModal())}
              type="button"
              tw="border border-white w-[170px] mx-auto md:mx-0 font-semibold h-[49px] mt-[20px] bg-secondary-color text-white rounded-md"
            >
              JOIN US
            </button>
          )}
        </div>
        <div tw="hidden lg:inline-flex  lg:px-20">
          <Lottie animationData={animation} />
        </div>
      </main>
    </div>
  );
};

export default Home;
