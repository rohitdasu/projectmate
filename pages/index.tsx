import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';
import animation from '../public/animation-lottie.json';
import { useAppDispatch } from '../app/hooks';
import { AuthModal } from '../components';
import { openModal } from '@/store/slices/sliceModal';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { motion } from 'framer-motion';

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  return (
    <SharedLayout title="Home">
      <div className="mt-[5rem] flex flex-1 lg:w-full ">
        <AuthModal title={'Continue with your social accounts'} />
        <div className="flex flex-1 flex-col justify-center px-4 text-center lg:m-0 lg:w-1/2 lg:text-left">
          <h1 className="text-[40px] font-bold uppercase leading-normal text-foreground-1  md:text-[55px] lg:leading-[82px]">
            A place where you find{' '}
            <span className="uppercase text-primary-color">OpenSource</span>{' '}
            Projects
          </h1>

          <p className="mt-4 text-[17px] font-light leading-normal text-gray-800 text-foreground-1 md:text-[20px] md:leading-[30px]">
            We will help you to find opensource project and contributors.
          </p>

          {session ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/projects')}
              type="button"
              className="mx-auto mt-[20px] h-[49px] w-[170px] rounded-md border border-white bg-secondary-color font-semibold text-white focus:bg-blue-800 focus:ring lg:mx-0"
            >
              Explore Projects
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(openModal())}
              type="button"
              className="mx-auto mt-[20px] h-[49px] w-[170px] rounded-md border border-white bg-secondary-color font-semibold text-white focus:bg-blue-800 focus:ring lg:mx-0"
            >
              JOIN US
            </motion.button>
          )}
        </div>
        <div className="hidden lg:inline-flex  lg:px-20">
          <Lottie animationData={animation} />
        </div>
      </div>
    </SharedLayout>
  );
};

export default Home;
