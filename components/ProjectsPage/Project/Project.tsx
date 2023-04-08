import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const handleViewStatsClick = () => {
    router.push(`/projects/${id}`);
  };
  const handleShare = () => {
    toastMessage('Share feature is disabled', messageType.error);
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
              fontSize="xl"
              fontWeight="bold"
              className="flex flex-col gap-2 truncate text-gray-100"
            >
              {title}
              <div className="flex items-center gap-2 text-base font-bold text-gray-400">
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
                <span>{author}</span>
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
                maximumTagsToShow={5}
                maximumCharactersToShow={20}
                className="flex-wrap gap-1 text-sm font-medium"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-2">
              <Button
                onClick={handleViewStatsClick}
                isDisabled={false}
                className="flex flex-row items-center justify-center gap-2 bg-transparent px-2 py-1.5 font-bold !text-gray-200 focus:ring-0 sm:my-0"
              >
                <IoStatsChartSharp />
                <span>View Stats</span>
              </Button>
              <Button
                onClick={handleContributeClick}
                isDisabled={false}
                className="flex flex-row items-center justify-center gap-2 bg-transparent px-2 py-1.5 font-bold !text-gray-200 focus:ring-0 sm:my-0"
              >
                <FaHandshake />
                <span>Contribute</span>
              </Button>
            </div>
            <Button
              onClick={handleShare}
              isDisabled={false}
              className="flex flex-row items-center justify-center gap-2 bg-transparent px-2 py-1.5 font-bold !text-gray-200 hover:text-primary-color focus:ring-0 sm:my-0"
            >
              <IoIosShareAlt />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};
