import React, { useState } from 'react';
import { Typography } from '@/components/Typography';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { EditProfileModal } from './EditProfileModal';
import { UserDetails } from './UserBio.interface';

export const UserBio: React.FC<UserDetails> = ({
  title,
  description,
  skills,
  numberOfProjects,
}) => {
  const [isDescriptionClamped, setIsDescriptionClamped] = useState(true);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditorProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
      className="flex w-full flex-col justify-between gap-4 p-4"
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
          {title}
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
          {description}
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
          tags={skills}
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
          className={`mx-2  sm:text-base ${
            numberOfProjects === 0 ? 'text-red-500' : 'text-gray-100'
          }`}
        >
          {numberOfProjects}
        </Typography>
      </div>
      <button
        onClick={openEditProfileModal}
        className="flex max-w-sm flex-1 cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-gray-700 px-2 py-1 text-gray-300 transition-all hover:opacity-70 md:px-3 md:py-2"
      >
        Edit profile
      </button>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        closeModal={closeEditorProfileModal}
        currentTitle={title}
        currentDescription={description}
        currentSkills={skills}
        currentNumberOfProjects={numberOfProjects}
      />
    </motion.div>
  );
};
