import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import useGetAllTags from '@/hooks/useGetAllTags';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

const RightBar = () => {
  const { data: tags } = useGetAllTags();
  // console.log("LINE AT 9" , tags);
  // const allUniqueTag = tags?.results;
  const router = useRouter();
  const { tag } = router.query;
  // console.log(tag);
  const [flag, setFlag] = useState(true);
  // console.log("LINE AT 16" , flag);
  const handleClick = useCallback(
    (e: any, tag: string) => {
      e.stopPropagation();
      if (flag) {
        const url = `/tprojects/${tag}`;
        router.push(url);
        setFlag(!flag);
      } else {
        router.push('/projects');
        setFlag(!flag);
      }
    },
    [router, flag]
  );
  return (
    <div className="fixed   h-dvh  items-center px-2 pt-6 md:items-start md:px-8 lg:w-1/4">
      <Header data="Tags" />
      {tags?.results.map((item: string, index: number) => {
        return (
          <Button
            key={index}
            className={`mb-2 mr-2`}
            variant={item === tag ? 'secondary' : 'default'}
            onClick={(e) => handleClick(e, item)}
          >
            {item.toLowerCase()}
          </Button>
        );
      })}
    </div>
  );
};

export default RightBar;
