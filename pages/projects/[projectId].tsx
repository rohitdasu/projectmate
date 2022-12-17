import { SharedLayout } from '@/components/Layouts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import axios from 'axios';
import useSWR from 'swr';
import Lottie from 'lottie-react';
import Loader from '../../public/loading.json';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { Stats } from '@/components/Stats';

const ProjectDetails = () => {
  const router = useRouter();
  const { projectId } = router.query || {};
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url = `/api/project/${projectId}`;
  const { data, error } = useSWR(projectId ? url : null, fetcher);
  const { results: projectData } = data || {};

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Lottie animationData={Loader} />
      </div>
    );
  }

  if (error)
    return <div className="m-auto my-5 text-lg">Failed to load projects</div>;

  return (
    <SharedLayout title="Project description" hasContainer>
      <div className="flex w-full">
        <div className="container m-auto mb-10 flex flex-col p-4">
          <h1 className="py-2 text-4xl font-semibold">
            {projectData?.title.toUpperCase()}
          </h1>
          <div className="mt-6 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-5">
              <Image
                src={
                  projectData?.author.image ||
                  `https://avatars.dicebear.com/api/initials/${projectData?.author.name}.png?backgroundColorLevel=800&fontSize=40`
                }
                alt="user-photo"
                height={40}
                width={40}
                className="rounded-full"
              />
              <h2 className="text-lg font-semibold">
                {projectData?.author.name}
              </h2>
              <span className="text-[12px] text-gray-400">
                {new Date(projectData?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <motion.a
              layout
              whileTap={{ scale: 0.9 }}
              href={projectData?.githubRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-max items-center space-x-4 rounded-full bg-orange-100 px-4 py-2 text-lg text-orange-500 ring-orange-800 hover:cursor-pointer hover:opacity-75 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400"
            >
              <span className="">Contribute</span>{' '}
              <BsBoxArrowUpRight className="" />
            </motion.a>
          </div>
          <div className="my-6 flex flex-col break-words">
            <h3 className="text-lg leading-8 text-gray-800 dark:text-gray-300">
              {projectData?.description}
            </h3>
          </div>
          <div>
            <h2 className="mt-6 text-left text-2xl font-semibold">
              Technology stack
            </h2>
            {projectData && (
              <Tags
                className="mt-5 mb-7 flex-wrap gap-3 text-[15px]"
                tags={projectData.tags}
              />
            )}
          </div>
          <Stats />
        </div>
      </div>
    </SharedLayout>
  );
};

export default ProjectDetails;
