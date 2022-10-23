import { useDispatch } from 'react-redux';
import { openModal } from '@/store/slices/sliceModal';
import { ProjectProps } from './Project.interface';
import { AiOutlineUser } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { Tags } from './Tags';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export const Project = ({
  id,
  title,
  description,
  tags,
  author,
}: ProjectProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const handleContributeClick = () => {
    session ? router.push(`/projects/${id}`) : dispatch(openModal());
  };

  return (
    <motion.div
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
          <p className="h-[80px] text-sm line-clamp-4">{description}</p>
          <div className="flex flex-col gap-5">
            <div className="flex space-x-2 pb-2 md:pb-0">
              <Tags tags={tags} tagsNumber={2} />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleContributeClick}
              className="mt-2 flex justify-center rounded-md bg-secondary-color px-2 py-1.5 font-bold text-white focus:ring sm:my-0"
            >
              <span>Contribute</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
