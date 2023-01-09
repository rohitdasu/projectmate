import { useState } from 'react';
import { ProjectProps } from './Project.interface';
import { AiOutlineUser, AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import axios from 'axios';
import { messageType, toastMessage } from 'shared';

export const Project = ({
  id,
  title,
  description,
  tags,
  author,
  liked,
  likesCount,
}: ProjectProps) => {
  const [likedState, setLikedState] = useState(liked);
  const [likesState, setLikesState] = useState(likesCount);
  const router = useRouter();
  const handleContributeClick = () => {
    router.push(`/projects/${id}`);
  };

  const onLike = async () => {
    try {
      await axios.post(`/api/project/${id}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLikedState(true);
      setLikesState((prevState) => prevState + 1);
    } catch (e) {
      toastMessage(e.message, messageType.error);
    }
  };

  const onUnlike = async () => {
    try {
      await axios.delete(`/api/project/${id}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLikedState(false);
      setLikesState((prevState) => prevState - 1);
    } catch (e) {
      toastMessage(e.message, messageType.error);
    }
  };

  const handleLikeClick = async () => {
    if (!likedState) {
      await onLike();
    }
    if (likedState) {
      await onUnlike();
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full p-2 shadow-lg md:p-0"
    >
      <div className="flex h-full flex-col items-center overflow-hidden rounded-md text-foreground-1 shadow-border-shadow">
        <div className="flex w-full grow flex-col gap-5 p-4 pt-4">
          <div className="flex w-full items-center">
            <h2 className="min-w-[0] flex-1 flex-col gap-2 truncate text-xl font-semibold">
              {title}
              <span className="flex items-center gap-1 text-sm font-light">
                <AiOutlineUser />
                {author}
              </span>
            </h2>
            <div className="flex flex-1 justify-end">
              <Button
                onClick={handleLikeClick}
                isDisabled={false}
                className="flex items-center px-2 py-1 font-bold sm:my-0"
              >
                {likedState ? <AiFillLike /> : <AiOutlineLike />}
                <span className="px-2">Like</span>
              </Button>
              <span className="mx-2 rounded-md bg-background-2 px-2 py-1">
                {likesState}
              </span>
            </div>
          </div>
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
