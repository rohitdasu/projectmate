import { useMemo } from 'react';
import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import {
  RemoveTagFc,
  Tags,
  SharedLayout,
  MultiSelectInput,
  ProjectsList,
} from '@/components';

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url = `/api/tags`;
  const { data: availableTags, error } = useSWR(url, fetcher);
  const filteredAvailableTags = useMemo(() => {
    if (availableTags?.results && !error) {
      return availableTags.results.filter(
        (tag: string) => !selectedTags.includes(tag)
      );
    }
    return [];
  }, [availableTags, selectedTags, error]);

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
      <section className="relative my-4 flex w-full flex-col gap-4 px-4 lg:flex-row">
        <header className="sr-only">
          <h1>Projects</h1>
        </header>
        <div className="relative top-4 h-auto flex-1 lg:sticky lg:h-96">
          <form
            className="flex flex-col items-start gap-x-2 gap-y-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="filterTags">Filter by tags:</label>
            <MultiSelectInput
              onEnterClick={onEnterClick}
              suggestions={filteredAvailableTags}
              inputClassName="w-full md:w-80 items-center rounded-md border border-gray-700 bg-transparent px-3 py-1 outline-none"
              errorMessage="The inserted Tag does not exists"
              id="filterTags"
            />
          </form>
          <Tags
            tags={selectedTags}
            removeTagHandler={onDeleteTag}
            className="my-2 flex-wrap gap-2"
            tagClassName="bg-slate-200 text-sm font-medium"
          />
        </div>
        <ProjectsList selectedTags={selectedTags} />
      </section>
    </SharedLayout>
  );
};

export default Projects;
