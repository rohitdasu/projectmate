import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import useGetAllTags from '@/hooks/useGetAllTags';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const RightBar = () => {
  const { data: tags } = useGetAllTags();
  // const allUniqueTag = tags?.results;
  const router = useRouter();

  const handleClick = useCallback(
    (e: any, tag: string) => {
      e.stopPropagation();

      const url = `/tprojects/${tag}`;
      router.push(url);
    },
    [router]
  );
  return (
    <div className="mt-7">
      <Header data="Tags" />
      {tags?.results.map((item: string, index: number) => {
        return (
          <Button
            key={index}
            className="mb-2 mr-2"
            onClick={(e) => handleClick(e, item)}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default RightBar;
