import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../app/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { GiClick } from 'react-icons/gi';
import { MdDashboardCustomize } from 'react-icons/md';
import Lottie from 'lottie-react';
import animation from '../../public/animations/hero.json';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';
import { Typography } from '@/components/Typography';

export const Hero = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();

  const handleModal = () => dispatch(openModal());
  const handleRoute = () => router.push('/projects');

  const style = {
    height: 435,
    width: 435,
  };

  return (
    <header className="flex flex-row items-center justify-between">
      <div className="flex flex-col items-center gap-10 lg:items-start">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
          <Typography
            as="h1"
            align="left"
            fontSize="2xl"
            fontWeight="bold"
            className="md:text-4xl"
          >
            Start Contributing to{' '}
            <Typography
              as="span"
              fontSize="2xl"
              fontWeight="bold"
              className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent dark:from-orange-500 dark:via-orange-700 dark:to-orange-500 md:text-4xl"
            >
              Open Source
            </Typography>{' '}
            Projects
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          layout
          className="max-w-[50rem]"
        >
          <Typography
            as="p"
            fontSize="base"
            fontWeight="light"
            align="justify"
            className="dark:text-gray-300 md:text-xl"
          >
            Projectmate is a platform that connects open-source enthusiasts with
            repository owners and maintainers looking for contributors. With
            Projectmate, you can browse through a variety of open-source
            projects and find one that aligns with your skills.
          </Typography>
        </motion.div>
        <motion.div
          layout
          className="flex w-full flex-col items-center justify-between gap-4 md:w-auto md:flex-row"
        >
          {session === null && (
            <Button
              onClick={handleModal}
              isDisabled={false}
              className="w-full py-3 px-6 text-base font-semibold shadow-lg md:w-auto md:text-lg"
            >
              <span className="flex items-center justify-center gap-3">
                Login / Register
                <GiClick className="text-2xl" />
              </span>
            </Button>
          )}
          {session !== undefined && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              layout
              onClick={handleRoute}
              className={`w-full rounded-md bg-slate-200 py-3 px-6 text-base font-semibold text-gray-900 opacity-75 shadow transition-all hover:opacity-100 focus:ring dark:bg-gray-700 dark:text-gray-100 md:w-auto md:text-lg ${
                session &&
                'border-0 !bg-orange-100 !text-orange-500 ring-orange-800 dark:!bg-[#2c1c0f] dark:!text-orange-400'
              }`}
            >
              <span className="flex items-center justify-center gap-3">
                Explore Projects
                <MdDashboardCustomize />
              </span>
            </motion.button>
          )}
          {status === 'loading' && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              layout
              className={`w-full rounded-md border-2 border-gray-200 py-3 px-6 text-base font-semibold text-gray-900 opacity-75 transition-all hover:opacity-100 focus:ring dark:border-gray-600 dark:text-gray-100 md:w-auto md:text-lg ${
                session &&
                'border-0 !bg-orange-100 !text-orange-500 ring-orange-800 dark:!bg-[#2c1c0f] dark:!text-orange-400'
              }`}
            >
              <span className="flex animate-pulse items-center justify-center gap-3">
                Loading...
              </span>
            </motion.button>
          )}
        </motion.div>
      </div>
      <div className="-mr-10 hidden lg:block">
        <Lottie animationData={animation} style={style} />
      </div>
    </header>
  );
};
