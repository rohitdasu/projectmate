import { ProjectProps } from './Project.interface';
import { AiOutlineUser } from 'react-icons/ai';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import moment from 'moment';

export const Project = ({
  id,
  title,
  description,
  tags,
  author,
  createdAt,
}: ProjectProps) => {
  const router = useRouter();
  const handleContributeClick = () => {
    router.push(`/projects/${id}`);
  };

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      layout
      transition={{ duration: 1 }}
      className="m-2 rounded-lg border-4 border-slate-800 bg-slate-900 shadow-lg md:m-auto md:w-full"
    >
      <div className="flex h-full flex-col items-center overflow-hidden rounded-md">
        <div className="flex w-full grow flex-col gap-5 p-4 pt-4">
          <div className="flex flex-row items-start justify-between">
            <Typography
              as="h2"
              fontSize="xl"
              fontWeight="semibold"
              className="min-w-[0] flex-1 flex-col gap-2 truncate text-gray-100"
            >
              {title}
              <span className="flex items-center gap-1 text-sm font-light text-gray-100">
                <AiOutlineUser />
                {author}
              </span>
            </Typography>
            <div className="flex flex-row items-center gap-1 text-gray-400">
              <Typography as="span" fontSize="3xl">
                ·
              </Typography>
              <Typography as="p" fontSize="sm" fontWeight="light">
                {moment(createdAt).fromNow()}
              </Typography>
            </div>
          </div>
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
            <Button
              onClick={handleContributeClick}
              isDisabled={false}
              className="mt-2 px-2 py-1.5 font-bold hover:animate-pulse sm:my-0"
            >
              <span>Contribute</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};
