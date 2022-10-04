import { AuthModal } from '@/components/AuthModal';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../app/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { GoPlus } from 'react-icons/go';
import { MdDashboardCustomize } from 'react-icons/md';
import Lottie from 'lottie-react';
import animation from './lotties/hero.json';

export const Hero = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleModal = () => dispatch(openModal());
  const handleRoute = () => router.push('/projects');

  const style = {
    height: 435,
    width: 435,
  };

  return (
    <header className="m-auto px-4 py-[5rem] lg:flex lg:items-center lg:justify-between">
      <AuthModal title={'Continue with your social accounts'} />
      <div className="flex flex-col items-center gap-10 text-center lg:items-start lg:text-left">
        <h1 className="text-4xl font-bold text-[#2b2b2b] dark:text-white">
          Start Contributing to Open Source Projects
        </h1>
        <p className="max-w-[50rem] font-light  dark:text-gray-300 md:text-xl">
          ProjectMate helps you to find awesome open source projects based on
          the skills you have. You can also find new contributers for your open
          source project by sharing it on ProjectMate !
        </p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={session ? handleRoute : handleModal}
          type="button"
          className="rounded-md bg-orange-100 p-4 font-semibold text-orange-500 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400 md:text-xl"
        >
          {session ? (
            <span className="flex items-center gap-3">
              <MdDashboardCustomize />
              Explore Projects
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <GoPlus />
              Join Us
            </span>
          )}
        </motion.button>
      </div>
      <div className="-mr-10 hidden lg:block">
        <Lottie animationData={animation} style={style} />
      </div>
    </header>
  );
};
