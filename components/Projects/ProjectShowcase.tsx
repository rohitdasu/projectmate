import { projects } from '../../sample-data/data';
import Project from './Project';

export const ProjectShowcase = () => {
  return (
    <div className="flex h-[600px] scroll-hide overflow-y-scroll flex-col !mt-[4rem] space-y-4">
      {projects.map((project) => (
        <Project
          key={project.id}
          description={project.description}
          name={project.name}
          tags={project.tags}
        />
      ))}
    </div>
  );
};
