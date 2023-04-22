import React from 'react';
// import axios from 'axios';
// import useSWR from 'swr';
// import { setSelectedTags as S } from '@/store/slices/sliceFilter';
// import { useAppDispatch } from '@/hooks';
// import { MultiSelectInput, RemoveTagFc, Tags } from '@/components';

export const Filters = () => {
  // const dispatch = useAppDispatch();
  // const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  // const url = `/api/tags`;
  // const { data: availableTags, error } = useSWR(url, fetcher);
  // const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // const filteredAvailableTags = React.useMemo(() => {
  //   if (availableTags?.results && !error) {
  //     return availableTags.results.filter(
  //       (tag: string) => !selectedTags.includes(tag)
  //     );
  //   }
  //   return [];
  // }, [availableTags, selectedTags, error]);

  // const onEnterClick = (value: string) => {
  //   setSelectedTags((prev) => [...prev, value]);
  // };

  // React.useEffect(() => {
  //   dispatch(S(selectedTags)); // adding the selected tags to the store
  // }, [selectedTags, dispatch]);

  // const onDeleteTag: RemoveTagFc = (_event, index) => {
  //   setSelectedTags((prev) => {
  //     const newTags = [...prev];
  //     newTags.splice(index, 1);
  //     return newTags;
  //   });
  // };

  return (
    <div className="relative top-6 hidden h-auto flex-1 px-4 lg:sticky lg:block lg:h-96">
      <form
        className="flex flex-col items-start gap-x-2 gap-y-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="filterTags">Search projects</label>
        <input
          type="text"
          className="w-full items-center rounded-md border border-gray-900 bg-gray-800 p-3 outline-none placeholder:opacity-70 md:w-80"
          placeholder="type a project name"
        />
      </form>
      {/* <MultiSelectInput
          onEnterClick={onEnterClick}
          suggestions={filteredAvailableTags}
          inputClassName="w-full md:w-80 items-center rounded-md border border-gray-700 bg-transparent px-3 py-1 outline-none"
          errorMessage="The inserted Tag does not exists"
          id="filterTags"
        />
      <Tags
        tags={selectedTags}
        removeTagHandler={onDeleteTag}
        className="my-2 flex-wrap gap-2"
        tagClassName="bg-slate-200 text-sm font-medium"
      /> */}
    </div>
  );
};
