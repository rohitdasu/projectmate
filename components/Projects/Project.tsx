import { useState } from 'react';
import { ProjectProps } from './Project.interface';
import { AiOutlineUser, AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import axios from 'axios';
import { messageType, toastMessage } from 'shared';
import { useSession } from 'next-auth/react';

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
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const session = useSession();
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
      setLikesCountState((prevState) => prevState + 1);
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
      setLikesCountState((prevState) => prevState - 1);
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

  let likeIcon = <AiOutlineLike />;
  if (session.status === 'authenticated' && likedState) {
    likeIcon = <AiFillLike />;
  }

  let likesCountElement: JSX.Element | null = null;

  if (likesCountState > 0) {
    likesCountElement = (
      <span className="text-orange pr-1">{likesCountState}</span>
    );
  }

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
          <Typography
            as="h2"
            fontSize="xl"
            fontWeight="semibold"
            className="min-w-[0] flex-1 flex-col gap-2 truncate"
          >
            {title}
            <span className="flex items-center gap-1 text-sm font-light ">
              <AiOutlineUser />
              {author}
            </span>
          </Typography>
          <Typography as="p" fontSize="sm" className="h-20 line-clamp-4">
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
                className="mt-2 grow px-2 py-1.5 font-bold sm:my-0"
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
