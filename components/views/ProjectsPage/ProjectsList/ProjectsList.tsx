import { useEffect, useMemo, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { ProjectWrapper } from '../Project/Project';
import { ProjectSkeleton } from '../ProjectSkeleton';
import { IProject } from '../Project/Project.interface';
import { fetcher } from '@/lib/fetcher';
import { useShareModal } from '@/hooks/useShareModal';
import { ErrorPage } from '@/components/Common/Error';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export const ProjectsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const { openModal: openShareModal } = useShareModal();

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

  const { data, size, setSize, error, isLoading } = useSWRInfinite<IProject[]>(
    getKey,
    fetcher
  );

  // Generate array of specified length with random key value
  const numberOfSKeletonPost = 4;
  const skeletonProjectsToLoad = Array.from(
    { length: numberOfSKeletonPost },
    () => (Math.random() + 1).toString(36).substring(7)
  );

  const paginatedProjects = data?.flat();

  const isLoadingMore = data && typeof data[size - 1] === 'undefined';
  const isNotReachEnd = data && (data[data.length - 1]?.length ?? 0) > 0;

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (isNotReachEnd) {
          setSize(size + 1);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isNotReachEnd, setSize, size]);

  const availableTags = useMemo(
    () =>
      Array.from(
        new Set(paginatedProjects?.flatMap((project) => project.tags) ?? [])
      ).sort(),
    [paginatedProjects]
  );
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return (paginatedProjects ?? []).filter((project) => {
      const matchesTag =
        selectedTag === 'All' || project.tags.includes(selectedTag);
      const searchableText = `${project.title} ${
        project.description
      } ${project.tags.join(' ')}`.toLowerCase();
      return matchesTag && (!query || searchableText.includes(query));
    });
  }, [paginatedProjects, searchQuery, selectedTag]);

  if (error) return <ErrorPage />;

  return (
    <div className="space-y-7">
      <div className="grid gap-5 border-2 border-[#0f0f0f] bg-white p-5 shadow-[4px_4px_0_0_#0f0f0f] md:grid-cols-[minmax(240px,1fr)_2fr] md:items-start md:p-6">
        <div>
          <label
            htmlFor="project-search"
            className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500"
          >
            Search projects
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Try React, API, or a project name"
              className="w-full border-2 border-[#0f0f0f] bg-[#f8f9fa] py-3 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-gray-500 focus:border-[#0044ff]"
            />
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">
            Browse by tag
          </p>
          <div className="flex flex-wrap gap-2">
            {['All', ...availableTags].map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
                className={`border-2 border-[#0f0f0f] px-3 py-1.5 text-xs font-bold transition-colors ${
                  selectedTag === tag
                    ? 'bg-[#0f0f0f] text-white'
                    : 'bg-white hover:bg-[#0044ff] hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-2 border-[#0f0f0f] pb-3">
        <p className="font-display text-sm font-bold uppercase tracking-wide">
          {filteredProjects.length}{' '}
          {filteredProjects.length === 1 ? 'project' : 'projects'} shown
        </p>
        {selectedTag !== 'All' || searchQuery ? (
          <button
            type="button"
            className="text-xs font-bold uppercase text-[#0044ff] underline underline-offset-4"
            onClick={() => {
              setSelectedTag('All');
              setSearchQuery('');
            }}
          >
            Clear filters
          </button>
        ) : null}
      </div>
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
      >
        {isLoading
          ? skeletonProjectsToLoad.map((randomKey) => (
              <ProjectSkeleton key={randomKey} />
            ))
          : filteredProjects.map((project: IProject) => (
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
      </motion.ul>
      {filteredProjects.length === 0 && !isLoading && (
        <div className="border-2 border-dashed border-[#0f0f0f] bg-white px-6 py-16 text-center">
          <p className="font-display text-xl font-black uppercase">
            No projects found
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Try another search or clear the selected tag.
          </p>
        </div>
      )}
      {data && isLoadingMore && isNotReachEnd ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {skeletonProjectsToLoad.map((randomKey) => (
            <ProjectSkeleton key={randomKey} />
          ))}
        </ul>
      ) : null}
    </div>
  );
};
