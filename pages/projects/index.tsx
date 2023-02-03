import React, { useState } from 'react';
import { ProjectsList, SharedLayout } from '../../components';
import MultiSelectInput from '@/components/Form/MultiSelectInput/MultiSelectInput';
import { useMemo } from 'react';
import { RemoveTagFc, Tags } from '@/components/Tags';
import useSWR from 'swr';
import axios from 'axios';

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
      <div className="mt-4 flex flex-col">
        <div className="container m-auto mb-2 flex max-w-screen-xl flex-col gap-y-4 px-2 md:px-5">
          <div className="flex flex-col items-start gap-x-2 gap-y-2 md:flex-row md:items-center">
            <h4>Filter by tags:</h4>
            <MultiSelectInput
              onEnterClick={onEnterClick}
              suggestions={filteredAvailableTags}
              inputClassName="w-full md:w-52 items-center rounded-md border-2 border-gray-700 bg-transparent px-3 py-1 outline-none"
              errorMessage="The inserted Tag does not exists"
            />
          </div>
          <Tags
            tags={selectedTags}
            removeTagHandler={onDeleteTag}
            className="flex-wrap gap-2"
            tagClassName="bg-slate-200 text-sm font-medium"
          />
        </div>
        <ProjectsList selectedTags={selectedTags} />
      </div>
    </SharedLayout>
  );
};

export default Projects;
