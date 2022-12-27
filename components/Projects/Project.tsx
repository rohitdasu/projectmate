import { ProjectProps } from './Project.interface';
import { AiOutlineUser } from 'react-icons/ai';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';

export const Project = ({
  id,
  title,
  description,
  tags,
  author,
}: ProjectProps) => {
  const router = useRouter();
  const handleContributeClick = () => {
    router.push(`/projects/${id}`);
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full p-2 shadow-lg md:p-0"
    >
      <div className="flex h-full flex-col items-center overflow-hidden rounded-md text-foreground-1 shadow-border-shadow">
        <div className="flex w-full grow flex-col gap-5 p-4 pt-4">
          <h2 className="min-w-[0] flex-1 flex-col gap-2 truncate text-xl font-semibold">
            {title}
            <span className="flex items-center gap-1 text-sm font-light ">
              <AiOutlineUser />
              {author}
            </span>
          </h2>
          <p className="h-20 text-sm line-clamp-4">{description}</p>
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
              className="mt-2 px-2 py-1.5 font-bold sm:my-0"
            >
              <span>Contribute</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};
