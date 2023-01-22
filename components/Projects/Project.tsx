import { useEffect, useState } from 'react';
import { ProjectProps } from './Project.interface';
import { AiOutlineUser, AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Tags } from '@/components/Tags';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { useSession } from 'next-auth/react';
import { messageType, toastMessage } from 'shared';
import axios from 'axios';

export const Project = ({
  id,
  title,
  description,
  tags,
  author,
  liked,
  likesCount,
  mutate,
}: ProjectProps) => {
  const session = useSession();
  const [likedState, setLiked] = useState(false);
  const [likesCountState, setLikesCount] = useState(0);
  const isYou = author === session.data?.user?.name;
  const router = useRouter();
  const handleContributeClick = () => {
    router.push(`/projects/${id}`);
  };
  useEffect(() => {
    setLiked(liked);
    setLikesCount(likesCount);
  }, [liked, likesCount, setLiked, setLikesCount]);

  const likeProject = async (prevLiked: boolean, prevLikesCount: number) => {
    try {
      await axios.post(`/api/project/${id}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      toastMessage(e.message, messageType.error);
      setLiked(prevLiked);
      setLikesCount(prevLikesCount);
    } finally {
      mutate();
    }
  };

  const unlikeProject = async (prevLiked: boolean, prevLikesCount: number) => {
    try {
      await axios.delete(`/api/project/${id}/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      toastMessage(e.message, messageType.error);
      setLiked(prevLiked);
      setLikesCount(prevLikesCount);
    } finally {
      mutate();
    }
  };

  const handleLikeClick = async () => {
    if (session.status !== 'authenticated') {
      toastMessage('Please login to like projects!', messageType.error);
      return;
    }
    if (isYou) {
      toastMessage('You cannot like your own project!', messageType.error);
      return;
    }
    const prevLiked = likedState;
    const prevLikesCount = likesCountState;
    if (likedState) {
      setLiked(false);
      setLikesCount((prevState) => prevState - 1);
      unlikeProject(prevLiked, prevLikesCount);
    } else {
      setLiked(true);
      setLikesCount((prevState) => prevState + 1);
      likeProject(prevLiked, prevLikesCount);
    }
  };

  let likeIcon = <AiOutlineLike />;
  if (likedState) {
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
                className="mt-2 flex items-center px-2 py-1 font-bold hover:animate-pulse sm:my-0"
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
