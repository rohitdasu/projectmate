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
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { IoIosShareAlt } from 'react-icons/io';
import { ProjectProps } from './Project.interface';
import { FaEye } from 'react-icons/fa';

export const Project = ({
  id,
  title,
  description,
  tags,
  author,
  createdAt,
  authorImage,
}: ProjectProps) => {
  const router = useRouter();
  const handleContributeClick = () => {
    router.push(`/projects/${id}`);
  };
  const handleShare = () => {
    toastMessage('Share feature is disabled', messageType.error);
  };

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      layout
      transition={{ duration: 1 }}
      className="rounded-lg border border-gray-800 bg-gray-900 shadow-lg md:m-auto md:w-full"
    >
      <div className="flex h-full flex-col items-center overflow-hidden rounded-md">
        <div className="flex w-full grow flex-col justify-center gap-5 p-4 pt-4">
          <header className="flex flex-row items-start justify-between">
            <Typography
              as="h2"
              fontSize="xl"
              fontWeight="semibold"
              className="min-w-[0] flex-1 flex-col gap-2 truncate text-gray-100"
            >
              {title}
              <div className="flex items-center gap-1 text-sm font-light text-gray-100">
                <Image
                  src={
                    authorImage ||
                    `https://avatars.dicebear.com/api/initials/${author}.png?backgroundColorLevel=800&fontSize=40`
                  }
                  alt="user-photo"
                  height={24}
                  width={24}
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
          <Typography
            as="p"
            fontSize="sm"
            className="h-20 text-gray-100 line-clamp-4"
          >
            {description}
          </Typography>
          <div className="flex flex-col gap-5">
            <div className="flex space-x-2 pb-2 md:pb-0">
              <Tags
                tags={tags}
                maximumTagsToShow={2}
                maximumCharactersToShow={20}
                className="flex-wrap gap-1 text-sm font-medium"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <Button
              onClick={handleContributeClick}
              isDisabled={false}
              className="mt-2 flex flex-1 flex-row items-center justify-center gap-2 px-2 py-1.5 font-bold hover:animate-pulse sm:my-0"
            >
              <FaEye />
              <span>View</span>
            </Button>
            <Button
              onClick={handleShare}
              isDisabled={false}
              className="mt-2 flex flex-row items-center justify-center gap-2 border border-gray-600 !bg-transparent px-2 py-1.5 font-bold hover:animate-pulse focus:ring-0 sm:my-0"
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
