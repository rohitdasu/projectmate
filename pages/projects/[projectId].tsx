import { SharedLayout } from '@/components/Layouts';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import Lottie from 'lottie-react';
import Loader from '../../public/animations/loading.json';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { Stats } from '@/components/Stats';
import { BiLink } from 'react-icons/bi';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Typography } from '@/components/Typography';

const ProjectDetails = () => {
  const router = useRouter();
  const { projectId } = router.query || {};
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url = `/api/project/${projectId}`;
  const { data, error } = useSWR(projectId ? url : null, fetcher);
  const repoURL =
    'https://api.github.com/repos/' +
    data?.results?.githubRepository?.slice(19);
  const { data: repoData, error: repoError } = useSWR(repoURL, fetcher);
  const { results: projectData } = data || {};
  if (!data && !repoData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Lottie animationData={Loader} />
      </div>
    );
  }

  if (error || repoError)
    return (
      <div className="m-auto my-5 flex h-screen items-center justify-center">
        <p className="text-lg">Failed to load project</p>
      </div>
    );

  return (
    <SharedLayout title={projectData?.title.toUpperCase()} hasContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
        className="flex w-full"
      >
        <div className="container m-auto mb-10 flex flex-col p-4">
          <div className="mb-4">
            <motion.button
              onClick={() => router.push('/projects')}
              whileTap={{ scale: 0.95 }}
              className="flex flex-row items-center justify-center gap-1 rounded-md border border-gray-800 px-3 py-2 shadow-md focus:ring dark:border-gray-300"
            >
              <RiArrowGoBackFill className="text-xl" />
              <span className="text-md block font-normal uppercase leading-4">
                back
              </span>
            </motion.button>
          </div>
          <Typography
            as="h1"
            fontSize="2xl"
            fontWeight="semibold"
            className="py-2 md:text-4xl"
          >
            {projectData?.title.toUpperCase()}
          </Typography>
          <div className="mt-6 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-5">
              <Image
                src={
                  projectData?.author?.image ||
                  `https://avatars.dicebear.com/api/initials/${projectData?.author?.name}.png?backgroundColorLevel=800&fontSize=40`
                }
                alt="user-photo"
                height={40}
                width={40}
                className="rounded-full"
              />
              <div>
                <Typography
                  as="h2"
                  fontSize="lg"
                  fontWeight="semibold"
                  className="text-lg font-semibold"
                >
                  {projectData?.author?.name}
                </Typography>
                <Typography
                  as="p"
                  fontSize="xs"
                  className="text-gray-600 dark:text-gray-300"
                >
                  {new Date(projectData?.createdAt).toLocaleDateString()}
                </Typography>
              </div>
            </div>
            <motion.a
              layout
              whileTap={{ scale: 0.9 }}
              href={projectData?.githubRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-lg text-gray-800 hover:cursor-pointer hover:text-blue-600 hover:underline dark:text-gray-300 dark:hover:text-blue-300"
            >
              <span className="">View Repo</span>
              <BiLink />
            </motion.a>
          </div>
          <div className="my-6 flex flex-col break-words">
            <Typography
              as="h3"
              fontSize="lg"
              className="leading-8 text-gray-800 dark:text-gray-300"
            >
              {projectData?.description}
            </Typography>
          </div>
          <div>
            <Typography
              as="h2"
              align="left"
              fontSize="2xl"
              fontWeight="semibold"
              className="mt-6"
            >
              Technology stack
            </Typography>
            {projectData && (
              <Tags
                className="mt-5 mb-7 flex-wrap gap-3 text-[15px]"
                tags={projectData?.tags}
              />
            )}
          </div>
          {repoData && <Stats {...repoData} />}
        </div>
      </motion.div>
    </SharedLayout>
  );
};

export default ProjectDetails;
