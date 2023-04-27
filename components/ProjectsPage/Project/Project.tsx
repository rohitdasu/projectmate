import { motion } from 'framer-motion';
import {
  Tags,
  Button,
  Typography,
  toastMessage,
  messageType,
} from '@/components';
import Image from 'next/legacy/image';
import moment from 'moment';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { IoIosShareAlt } from 'react-icons/io';
import { ProjectProps } from './Project.interface';
import { FaHandshake } from 'react-icons/fa';
import { IoStatsChartSharp } from 'react-icons/io5';

export const Project = ({
  id,
  title,
  description,
  tags,
  author,
  createdAt,
  authorImage,
  githubRepository,
}: ProjectProps) => {
  const handleFeature404 = () => {
    toastMessage('feature is disabled', messageType.error);
  };
  const handleContributeClick = () => {
    if (githubRepository) {
      window.open(githubRepository, '_blank');
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      transition={{ duration: 1 }}
      className="border border-gray-800 bg-gray-900 shadow-lg md:m-auto md:w-full"
    >
      <div className="flex h-full flex-col items-center overflow-hidden rounded-md">
        <div className="flex w-full grow flex-col justify-center gap-5 p-4 pt-4">
          <header className="flex flex-row items-start justify-between">
            <Typography
              as="h2"
              fontWeight="bold"
              className="flex flex-col gap-4 truncate text-base text-gray-100 md:text-xl"
            >
              {title}
              <div className="flex items-center gap-2 text-base font-bold text-gray-100 opacity-70">
                <Image
                  src={
                    authorImage ||
                    `https://avatars.dicebear.com/api/initials/${author}.png?backgroundColorLevel=800&fontSize=40`
                  }
                  alt="user-photo"
                  height={40}
                  width={40}
                  className="rounded-full"
                />
                <span className="text-sm md:text-lg">{author}</span>
              </div>
            </Typography>
            <div className="flex flex-row items-center gap-1 text-gray-400">
              <AiOutlineClockCircle />
              <Typography as="p" fontSize="sm" fontWeight="light">
                <time dateTime={createdAt.toString()}>
                  {moment(createdAt).fromNow()}
                </time>
              </Typography>
            </div>
          </header>
          <Typography as="p" fontSize="sm" className="text-gray-200">
            {description}
          </Typography>
          <div className="flex flex-col gap-5">
            <div className="flex space-x-2 pb-2 md:pb-0">
              <Tags
                tags={tags}
                className="flex-wrap gap-1 text-sm font-medium"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-2">
              <Button
                onClick={handleFeature404}
                isDisabled={false}
                className="flex flex-row items-center justify-center gap-2 bg-transparent px-2 py-1.5 font-bold !text-gray-200 focus:ring-0 sm:my-0"
              >
                <IoStatsChartSharp />
                <span className="text-sm md:text-base">Stats</span>
              </Button>
              <Button
                onClick={handleContributeClick}
                isDisabled={false}
                className="flex flex-row items-center justify-center gap-2 bg-transparent px-2 py-1.5 font-bold !text-gray-200 focus:ring-0 sm:my-0"
              >
                <FaHandshake />
                <span className="text-sm md:text-base">Contribute</span>
              </Button>
            </div>
            <Button
              onClick={handleFeature404}
              isDisabled={false}
              className="flex flex-row items-center justify-center gap-2 bg-transparent px-2 py-1.5 font-bold !text-gray-200 hover:text-primary-color focus:ring-0 sm:my-0"
            >
              <IoIosShareAlt />
              <span className="text-sm md:text-base">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};
