import { Project as ProjectData } from '@prisma/client';
import { useEffect, useState, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { Project } from './Project';
import { ProjectSkeleton } from './ProjectSkeleton';
import axios from 'axios';
import { BackToTop } from '../BackToTopButton';
import { ProjectsListProps } from './ProjectsList.interface';
import { useSession } from 'next-auth/react';

interface IProject extends ProjectData {
  author: {
    name: string;
  };
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ selectedTags }) => {
  const { status } = useSession();
  const [projects, setProjects] = useState<IProject[]>([]);

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

  const { data, size, setSize, error, mutate } = useSWRInfinite<IProject[]>(
    getKey,
    fetcher
  );

  // Generate array of specified length with random key value
  const skeletonProjectsToLoad = Array.from({ length: 10 }, () =>
    (Math.random() + 1).toString(36).substring(7)
  );

  const isLoadingMore = data && typeof data[size - 1] === 'undefined';
  const isNotReachEnd = data && data[data.length - 1].length;

  useEffect(() => {
    const authCheck = async () => {
      if (status === 'authenticated' || status === 'unauthenticated') {
        // Invalidate project list, when the logged in status changed to make sure that the `project.liked` property is up to date
        setProjects([]);
        const data = await mutate();
        if (data) {
          setProjects(data.flat());
        }
      }
    };
    authCheck();
  }, [mutate, status]);

  useEffect(() => {
    const onScroll = async function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (isNotReachEnd) {
          const data = await setSize(size + 1);
          if (data) {
            setProjects(data.flat());
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isNotReachEnd, setSize, size]);

  const filteredProjects = useMemo(() => {
    if (!projects?.length) {
      return [];
    }
    if (!selectedTags?.length) {
      return projects;
    }
    return projects.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag))
    );
  }, [projects, selectedTags]);

  if (error)
    return <div className="m-auto my-5 text-lg">Failed to load projects</div>;

  return (
    <>
      <ul className="container m-auto max-w-screen-xl auto-rows-auto gap-5 md:grid md:grid-cols-2 md:p-5 lg:grid-cols-3 xl:grid-cols-4">
        {projects?.length === 0 ? (
          skeletonProjectsToLoad.map((randomKey) => (
            <ProjectSkeleton key={randomKey} />
          ))
        ) : (
          <>
            {filteredProjects.map((project: IProject, i: number) => (
              <Project
                key={i}
                id={project.id}
                description={project.description}
                title={project.title}
                tags={project.tags}
                author={project.author.name}
                liked={project.liked}
                likesCount={project.likesCount}
                createdAt={project.createdAt}
              />
            ))}
          </>
        )}
        {isLoadingMore && isNotReachEnd ? (
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
