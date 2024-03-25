/* eslint-disable react-hooks/rules-of-hooks */
import useGetTProjects from '@/hooks/useGetTProjects';
import { useRouter } from 'next/router';
import React from 'react';
import { motion } from 'framer-motion';
import { ProjectSkeleton } from '@/components/views/ProjectsPage/ProjectSkeleton';
import { IProject } from '@/components/views/ProjectsPage/ProjectsList';
import { ProjectWrapper } from '@/components/views/ProjectsPage/Project/Project';
import { useShareModal } from '@/hooks/useShareModal';
import { SharedLayout } from '@/components/Layouts';

const tag = () => {
  const router = useRouter();
  const { tag } = router.query;
  const { data: projects, loading } = useGetTProjects(tag as string);
  // console.log("LINE AT 9" , projects);
  const numberOfSKeletonPost = 4;
  const skeletonProjectsToLoad = Array.from(
    { length: numberOfSKeletonPost },
    () => (Math.random() + 1).toString(36).substring(7)
  );
  const { openModal: openShareModal } = useShareModal();
  return (
    <SharedLayout title="Posts">
      <motion.ul
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className="mx-2 my-2 flex h-full flex-col gap-2 md:mx-auto"
      >
        {loading
          ? skeletonProjectsToLoad.map((randomKey) => (
              <ProjectSkeleton key={randomKey} />
            ))
          : projects?.results?.map((project: IProject) => (
              <ProjectWrapper
                key={project.id}
                id={project.id}
                description={project.description}
                title={project.title}
                tags={project.tags}
                author={project.author.name}
                username={project.author.username}
                authorImage={project.author.image}
                createdAt={project.createdAt}
                githubRepository={project.githubRepository}
                liveUrl={project.liveUrl}
                openShareModal={openShareModal}
              />
            ))}
        {projects?.results?.length === 0 && !loading && (
          <div className="flex h-dvh items-center justify-center text-xl">
            No Data
          </div>
        )}
        {projects?.result && loading ? (
          skeletonProjectsToLoad.map((randomKey) => (
            <ProjectSkeleton key={randomKey} />
          ))
        ) : (
          <></>
        )}
      </motion.ul>
    </SharedLayout>
  );
};

export default tag;
