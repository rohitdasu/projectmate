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
import { Topbar } from '@/components/Topbar/Topbar';

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.isLogged);

  return (
    <div className="flex-col items-center min-h-screen">
      <Head>
        <title>Projectmate | Home</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      {/* <Navbar active={'home'} /> */}
      <Topbar />
      <main tw="flex mt-[5rem] lg:w-full flex-1 ">
        <Toaster />
        <AuthModal
          title={
            'To view projects please verify your identity with these options'
          }
        />
        <div tw="flex flex-col px-[2px] flex-1 text-center lg:text-left justify-center lg:m-0 lg:w-1/2 lg:px-20">
          <h1 className="lg:leading-[82px] leading-normal font-bold md:text-[55px] text-[40px]  capitalize text-foreground-1">
            A place where you find{' '}
            <span className="uppercase text-primary-color">OpenSource</span>{' '}
            Projects
          </h1>

          <p className="mt-4 md:leading-[30px] leading-normal md:text-[20px] text-[17px] font-light text-gray-800 text-foreground-1">
            We will help you to find opensource project and contributors.
          </p>

          {userState ? (
            <button
              onClick={() => router.push('/projects')}
              type="button"
              tw="border focus:ring focus:bg-blue-800 border-white w-[170px] mx-auto lg:mx-0 font-semibold h-[49px] mt-[20px] bg-secondary-color text-white rounded-md"
            >
              Explore Projects
            </button>
          ) : (
            <button
              onClick={() => dispatch(openModal())}
              type="button"
              tw="border focus:ring focus:bg-blue-800 border-white w-[170px] mx-auto lg:mx-0 font-semibold h-[49px] mt-[20px] bg-secondary-color text-white rounded-md"
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
