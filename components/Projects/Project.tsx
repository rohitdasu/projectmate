import { ProjectProps } from './Project.interface';
import { AiOutlineUser, AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

export const Project = ({
  id,
  title,
  description,
  tags,
  author,
  liked,
  likesCount,
  likeProject,
  unlikeProject,
}: ProjectProps) => {
  const router = useRouter();
  const handleContributeClick = () => {
    router.push(`/projects/${id}`);
  };

  const handleLikeClick = async () => {
    if (!liked) {
      await likeProject(id);
    } else {
      await unlikeProject(id);
    }
  };

  let likeIcon = <AiOutlineLike />;
  if (liked) {
    likeIcon = <AiFillLike />;
  }

  let likesCountElement: JSX.Element | null = null;

  if (likesCount > 0) {
    likesCountElement = <span className="text-orange pr-1">{likesCount}</span>;
  }
  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="m-2 bg-white shadow-lg dark:border-4 dark:border-slate-800 dark:bg-slate-900 md:m-auto md:w-full"
    >
      <div className="flex h-full flex-col items-center overflow-hidden rounded-md">
        <div className="flex w-full grow flex-col gap-5 p-4 pt-4">
          <Typography
            as="h2"
            fontSize="xl"
            fontWeight="semibold"
            className="min-w-[0] flex-1 flex-col gap-2 truncate text-gray-900 dark:text-gray-100"
          >
            {title}
            <span className="flex items-center gap-1 text-sm font-light text-gray-900 dark:text-gray-100">
              <AiOutlineUser />
              {author}
            </span>
          </Typography>
          <Typography
            as="p"
            fontSize="sm"
            className="h-20 text-gray-900 line-clamp-4 dark:text-gray-100"
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
            <div className="flex gap-3">
              <Button
                onClick={handleLikeClick}
                isDisabled={false}
                className="mt-2 flex items-center px-2 py-1 font-bold sm:my-0"
              >
                {likeIcon}
                <span className="px-2">Like</span>
                {likesCountElement}
              </Button>
              <Button
                onClick={handleContributeClick}
                isDisabled={false}
                className="mt-2 grow px-2 py-1.5 font-bold hover:animate-pulse sm:my-0"
              >
                <span>Contribute</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};
