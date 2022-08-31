import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import tw from 'twin.macro';
import Lottie from 'lottie-react-web';
import animation from '../public/animation-lottie.json';
import { Navbar } from '../components/Navbar';
import { IContributors, ContributorList, AuthModal } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { openModal } from '../store/slices/modalSlice';
import { Toaster } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { openuserLogged } from '../store/slices/userSlice';

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const Mode = useAppSelector((state) => state.mode.mode);
  const userState = useAppSelector((state) => state.user.userLogged);
  const [user] = useAuthState(auth);
  // const [userlooged, setUserlooged] = useState(false);
  useEffect(() => {
    if (user?.displayName) {
      dispatch(openuserLogged());
    }
  }, [user, dispatch]);

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center ${
        Mode && 'bg-dark-mode'
      }`}
    >
      <Head>
        <title>projectmate</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Navbar active={'home'} />
      <main tw="flex   lg:w-full flex-1 ">
        <Toaster />
        <AuthModal />
        <div tw="flex flex-col px-[2px] flex-1 text-center md:text-left   justify-center lg:m-0 lg:w-1/2   lg:px-20">
          <h1
            className={`lg:leading-[82px] leading-normal font-bold  text-dark-color md:text-[55px] text-[40px]  capitalize ${
              Mode && '!text-white'
            }`}
          >
            A place where you find{' '}
            <span tw="text-primary-color uppercase">OpenSource</span>{' '}
            Projects
          </h1>

          <p
            className={`mt-4    md:leading-[30px] leading-normal md:text-[20px] text-[17px] font-light text-gray-800 ${
              Mode && '!text-white'
            } `}
          >
            We will help you to find opensource project and contributors.
          </p>

          {userState ? (
            <button
              onClick={() => router.push('/projects')}
              type="button"
              tw="border border-white w-[170px] mx-auto md:mx-0 font-semibold h-[49px] mt-[20px] bg-[#2854EECC] text-white rounded-md"
            >
              Explore Projects
            </button>
          ) : (
            <button
              onClick={() => dispatch(openModal())}
              type="button"
              tw="border border-white w-[170px] mx-auto md:mx-0 font-semibold h-[49px] mt-[20px] bg-[#2854EECC] text-white rounded-md"
            >
              JOIN US
            </button>
          )}
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
    </div>
  );
};

export default Home;
