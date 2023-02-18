import { SharedLayout } from '@/components/Layouts';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Lottie from 'lottie-react';
import Loader from 'public/animations/loading.json';
import errorAnimation from '../../public/animations/error.json';
import { motion } from 'framer-motion';
import { Typography } from '@/components/Typography';
import useSwr from 'swr';
import axios from 'axios';
import { EditProfileForm } from '@/components/EditProfileForm';

const EditProfile = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSwr('/api/user/details', fetcher);
  const { currentTitle, currentDescription, currentSkills } = data || {};

  // console.log(currentTitle);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/');
    },
  });

  if (status === 'loading' || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Lottie animationData={Loader} />
      </div>
    );
  }

  if (error) {
    return (
      <SharedLayout title="Submit Project" hasContainer>
        <div className="m-auto flex w-80 max-w-full flex-col gap-5">
          <Lottie animationData={errorAnimation} />
          <Typography as="p" align="center">
            There was an error found. <br></br> Please try again.
          </Typography>
        </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout title="Submit Project" hasContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        className="m-auto mb-12 flex flex-col space-y-4 rounded-lg pt-4 md:max-w-xl md:p-6"
      >
        <EditProfileForm
          currentTitle={currentTitle}
          currentDescription={currentDescription}
          currentSkills={currentSkills}
        />
      </motion.div>
    </SharedLayout>
  );
};

export default EditProfile;
