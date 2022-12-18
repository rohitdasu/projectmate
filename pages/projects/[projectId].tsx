import { SharedLayout } from '@/components/Layouts';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import Lottie from 'lottie-react';
import Loader from '../../public/loading.json';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { Stats } from '@/components/Stats';
import { BiLink } from 'react-icons/bi';

const ProjectDetails = () => {
  const router = useRouter();
  const { projectId } = router.query || {};
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url = `/api/project/${projectId}`;
  const { data, error } = useSWR(projectId ? url : null, fetcher);
  const repoURL =
    'https://api.github.com/repos/' +
    data?.results?.githubRepository?.slice(19);
  const { data: repoData } = useSWR(repoURL, fetcher);
  const { results: projectData } = data || {};
  if (!data && !repoData) {
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
              <div>
                <h2 className="text-lg font-semibold">
                  {projectData?.author.name}
                </h2>
                <p className="text-[12px] text-gray-400">
                  {new Date(projectData?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <motion.a
              layout
              whileTap={{ scale: 0.9 }}
              href={projectData?.githubRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-lg text-gray-800 hover:cursor-pointer hover:text-blue-600 hover:underline dark:text-gray-400 dark:hover:text-blue-300"
            >
              <span className="">Contribute</span>
              <BiLink />
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
          {repoData && <Stats {...repoData} />}
        </div>
      </div>
    </SharedLayout>
  );
};

export default ProjectDetails;
