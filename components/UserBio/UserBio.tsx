import React, { useState } from 'react';
import { Typography } from '@/components/Typography';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';

export const UserBio = () => {
  const [isDescriptionClamped, setIsDescriptionClamped] = useState(true);

  const temporarySkills = [
    'Backend',
    'Web Development',
    'Data Structures And Algorithms',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      layout
      className="flex w-full flex-col justify-between gap-3 p-4"
    >
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
          onClick={() => setIsDescriptionClamped(!isDescriptionClamped)}
          className={`cursor-pointer text-gray-300 sm:text-base ${
            isDescriptionClamped && 'line-clamp-4'
          }
          `}
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
        <Tags
          tags={temporarySkills}
          className="flex-wrap gap-2"
          tagClassName="bg-slate-500"
        />
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
    </motion.div>
  );
};
