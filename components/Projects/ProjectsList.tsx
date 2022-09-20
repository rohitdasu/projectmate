import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Project } from './Project';
import { ProjectSkeleton } from './ProjectSkeleton';

export const ProjectsList = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error } = useSWR('/api/project', fetcher);
  const [isLoading, setIsLoading] = useState(true);

  // Generate array of specified length with random key value
  const skeletonProjectsToLoad = Array.from({length: 10}, () => (Math.random() + 1).toString(36).substring(7));

  useEffect(() => {
    if(data) {
      setIsLoading(false)
    }
  }, [data])

  if (error) return <div className="m-auto text-lg my-5">Failed to load projects</div>;

  return (
    <div className="container gap-5 p-3 m-auto md:p-5 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading ? (
        skeletonProjectsToLoad.map((randomKey) => <ProjectSkeleton key={randomKey} />)
        ): (
          <>
            {data.results?.map((project: any) => (
              <Project
                key={project.id}
                description={project.description}
                title={project.title}
                tags={project.tags}
                author={project.author.email}
              />
            ))}
          </>
        )
      }
    </div>
  )
}
