import { Project as ProjectData } from '@prisma/client';
import { useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { Project } from './Project';
import { ProjectSkeleton } from './ProjectSkeleton';
import axios from 'axios';
import { BackToTop } from '../BackToTopButton';
import { ProjectsListProps } from './ProjectsList.interface';

interface IProject extends ProjectData {
  author: {
    name: string;
  };
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ selectedTags }) => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const getKey = (pageIndex: number, previousPageData: IProject[]) => {
    let cursorId = '';
    if (previousPageData) {
      const lastProject = previousPageData[previousPageData.length - 1];
      if (!lastProject) return null;
      cursorId = lastProject.id;
    }

    if (pageIndex === 0) return `/api/project`;

    return `/api/project?cursorId=${cursorId}`;
  };

  const { data, size, setSize, error } = useSWRInfinite<IProject[]>(
    getKey,
    fetcher
  );

  // Generate array of specified length with random key value
  const skeletonProjectsToLoad = Array.from({ length: 10 }, () =>
    (Math.random() + 1).toString(36).substring(7)
  );

  const paginatedProjects = data?.flat();

  const isLoadingMore = data && typeof data[size - 1] === 'undefined';
  const isNotReachEnd = data && data[data.length - 1].length;

  useEffect(() => {
    const onScroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (isNotReachEnd) {
          setSize(size + 1);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isNotReachEnd, setSize, size]);

  const filteredProjects = useMemo(() => {
    if (!paginatedProjects?.length) {
      return [];
    }
    if (!selectedTags?.length) {
      return paginatedProjects;
    }

    return paginatedProjects.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag))
    );
  }, [paginatedProjects, selectedTags]);

  if (error)
    return <div className="m-auto my-5 text-lg">Failed to load projects</div>;

  return (
    <>
      <ul className="container m-auto max-w-screen-xl auto-rows-auto gap-5 md:grid md:grid-cols-2 md:p-5 lg:grid-cols-3 xl:grid-cols-4">
        {!data ? (
          skeletonProjectsToLoad.map((randomKey) => (
            <ProjectSkeleton key={randomKey} />
          ))
        ) : (
          <>
            {filteredProjects.map((project: IProject) => (
              <Project
                key={project.id}
                id={project.id}
                description={project.description}
                title={project.title}
                tags={project.tags}
                author={project.author.name}
                createdAt={project.createdAt}
              />
            ))}
          </>
        )}
        {data && isLoadingMore && isNotReachEnd ? (
          skeletonProjectsToLoad.map((randomKey) => (
            <ProjectSkeleton key={randomKey} />
          ))
        ) : (
          <></>
        )}
      </ul>
      <BackToTop />
    </>
  );
};
