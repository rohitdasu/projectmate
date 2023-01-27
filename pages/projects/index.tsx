import React, { useState } from 'react';
import { ProjectsList, SharedLayout } from '../../components';
import { prisma } from '@/lib/prisma';
import { InferGetServerSidePropsType } from 'next';
import MultiSelectInput from '@/components/Form/MultiSelectInput/MultiSelectInput';
import { useMemo } from 'react';
import { RemoveTagFc, Tags } from '@/components/Tags';

const Projects = ({
  availableTags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredAvailableTags = useMemo(() => {
    return availableTags.filter((tag) => !selectedTags.includes(tag));
  }, [availableTags, selectedTags]);

  const onEnterClick = (value: string) => {
    setSelectedTags((prev) => [...prev, value]);
  };

  const onDeleteTag: RemoveTagFc = (_event, index) => {
    setSelectedTags((prev) => {
      const newTags = [...prev];
      newTags.splice(index, 1);
      return newTags;
    });
  };

  return (
    <SharedLayout title="Projects">
      <div className="flex flex-col">
        <div className="container m-auto flex max-w-screen-xl flex-col gap-y-4 md:px-5">
          <div className="flex items-center gap-x-2">
            <h4>Filter by tags:</h4>
            <MultiSelectInput
              onEnterClick={onEnterClick}
              suggestions={filteredAvailableTags}
              inputClassName="flex-1 w-full items-center rounded-md border-2 border-gray-200 bg-transparent p-1 outline-none focus:border-blue-600 focus:ring-blue-600"
            />
          </div>
          <Tags
            tags={selectedTags}
            removeTagHandler={onDeleteTag}
            className="gap-2"
          />
        </div>
        <ProjectsList selectedTags={selectedTags} />
      </div>
    </SharedLayout>
  );
};

export default Projects;

export async function getServerSideProps() {
  const allProjects = await prisma.project.findMany();
  const allTags = new Set<string>();
  allProjects.forEach((project) =>
    project.tags.forEach((tag) => allTags.add(tag))
  );

  return {
    props: {
      availableTags: Array.from(allTags),
    },
  };
}
