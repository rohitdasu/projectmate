import React from 'react';
import { Typography } from '@/components/Typography';
import { Tag } from '@/components/Tags/Tag';

export const UserBio = () => {
  return (
    <div className="flex w-full flex-col justify-between gap-3 p-4">
      <div className="flex flex-col">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          Title
        </Typography>
        <Typography
          as="p"
          fontSize="sm"
          fontWeight="light"
          className="text-gray-300 sm:text-base"
        >
          Senior software engineer
        </Typography>
      </div>
      <div className="flex flex-col">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          Description
        </Typography>
        <Typography
          as="p"
          fontSize="sm"
          fontWeight="light"
          className="text-gray-300 line-clamp-4 sm:text-base"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec
          tincidunt magna. Fusce pretium consequat sapien quis blandit. Aliquam
          a augue dignissim, rutrum felis et, dictum turpis.
        </Typography>
      </div>
      <div className="flex flex-col">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          Skills
        </Typography>
        <div className="flex flex-row flex-wrap gap-2 py-2">
          <Tag title="Golang" className="!bg-slate-500" />
          <Tag title="Typescript" className="!bg-slate-500" />
          <Tag title="Typescript" className="!bg-slate-500" />
        </div>
      </div>
      <div className="flex flex-row">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          Projects number:
        </Typography>
        <Typography
          as="span"
          fontSize="xl"
          fontWeight="medium"
          className="mx-1 text-gray-100 sm:text-base"
        >
          5
        </Typography>
      </div>
    </div>
  );
};
