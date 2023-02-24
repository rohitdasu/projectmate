import React, { useState } from 'react';
import Lottie from 'lottie-react';
import Loader from '../../public/animations/loading.json';
import errorAnimation from '../../public/animations/error.json';
import { Typography } from '@/components/Typography';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';

export const UserBio: React.FC = () => {
  const router = useRouter();
  const [isDescriptionClamped, setIsDescriptionClamped] = useState(true);
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url = `/api/user/details`;
  const { data, isLoading, error } = useSWR(url, fetcher);

  const {
    results: { title = undefined, description = undefined, skills = [] } = {},
  } = data || {};
  const numberOfProjects = data?.results?._count?.project;

  if (isLoading || !data) {
    return (
      <div className="m-auto flex items-center justify-center">
        <Lottie animationData={Loader} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-auto flex flex-col items-center justify-center gap-8 p-8">
        <Lottie className="w-32" animationData={errorAnimation} />
        <Typography as="p" align="center">
          Could not load profile data <br /> Please try again.
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
      className="flex w-full flex-col justify-between gap-4 p-4"
    >
      <Typography as="p" fontSize="xl" fontWeight="bold">
        Profile information
      </Typography>
      <div className="flex flex-col">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          Title:
        </Typography>
        <Typography
          as="p"
          fontSize="sm"
          fontWeight="light"
          className="text-gray-300 sm:text-base"
        >
          {title ? title : '-'}
        </Typography>
      </div>
      <div className="flex flex-col">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          Description:
        </Typography>
        <Typography
          as="p"
          fontSize="sm"
          fontWeight="light"
          onClick={() => setIsDescriptionClamped(!isDescriptionClamped)}
          className={`cursor-pointer text-gray-300 sm:text-base ${
            isDescriptionClamped && 'line-clamp-4'
          }
          `}
        >
          {description ? description : '-'}
        </Typography>
      </div>
      <div className="flex flex-col">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          Skills:
        </Typography>
        {skills.length ? (
          <Tags
            tags={skills}
            className="flex-wrap gap-2"
            tagClassName="!bg-slate-500"
          />
        ) : (
          <Typography
            as="p"
            fontSize="sm"
            fontWeight="light"
            className="text-gray-100 sm:text-base"
          >
            -
          </Typography>
        )}
      </div>
      <div className="flex flex-row">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          Projects number:
        </Typography>
        <Typography
          as="span"
          fontSize="xl"
          fontWeight="medium"
          className={`mx-2  sm:text-base ${
            numberOfProjects === 0 ? 'text-red-500' : 'text-gray-100'
          }`}
        >
          {numberOfProjects}
        </Typography>
      </div>
      <button
        onClick={() => {
          router.push('edit-profile');
        }}
        className="flex max-w-sm flex-1 cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-gray-700 px-2 py-1 text-gray-300 transition-all hover:opacity-70 md:px-3 md:py-2"
      >
        Edit profile
      </button>
    </motion.div>
  );
};
