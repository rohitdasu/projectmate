import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { Project } from './Project';
import { ProjectSkeleton } from './ProjectSkeleton';
import axios from 'axios';
import { BackToTop } from '../BackToTopButton';
import { IProject } from './Project.interface';
import { useSession } from 'next-auth/react';
import { messageType, toastMessage } from 'shared';

export const ProjectsList: React.FC = () => {
  const { status } = useSession();
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

  const { data, size, setSize, error, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const likeProject = async (projectId: string) => {
    try {
      await axios.post(`/api/project/${projectId}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      mutate();
    } catch (e) {
      toastMessage(e.message, messageType.error);
    }
  };

  const unlikeProject = async (projectId: string) => {
    try {
      await axios.delete(`/api/project/${projectId}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      mutate();
    } catch (e) {
      toastMessage(e.message, messageType.error);
    }
  };

  // Generate array of specified length with random key value
  const skeletonProjectsToLoad = Array.from({ length: 10 }, () =>
    (Math.random() + 1).toString(36).substring(7)
  );

  const paginatedPosts = data?.flat();

  const isLoadingMore = data && typeof data[size - 1] === 'undefined';
  const isNotReachEnd = data && data[data.length - 1].length;
  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      // Invalidate project list, when the logged in status changed to make sure that the `project.liked` property is up to date
      mutate();
    }
  }, [mutate, status]);
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
            {paginatedPosts?.map((project: IProject, i: number) => (
              <Project
                key={i}
                id={project.id}
                description={project.description}
                title={project.title}
                tags={project.tags}
                author={project.author.name}
                liked={project.liked}
                likesCount={project.likesCount}
                likeProject={likeProject}
                unlikeProject={unlikeProject}
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
