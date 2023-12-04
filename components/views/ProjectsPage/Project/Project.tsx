import { motion } from 'framer-motion';
import { Typography } from '@/components/Common/Typography';
import { ProjectProps } from './Project.interface';
import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart2,
  Forward,
  GitPullRequest,
  Globe2,
  History,
} from 'lucide-react';
import moment from 'moment';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

const INSIGHTS_WEBAPP = 'https://analyzemyrepo.com/analyze';

export const ProjectWrapper: React.FC<ProjectProps> = (props) => {
  const { toast } = useToast();

  const handleToast = () => {
    toast({
      title: 'Something went wrong!',
      variant: 'destructive',
    });
  };

  return <Project {...props} handleToast={handleToast} />;
};

export const Project: React.FC<ProjectProps & { handleToast: () => void }> =
  memo(
    ({
      title,
      description,
      tags,
      author,
      createdAt,
      authorImage,
      username,
      githubRepository,
      liveUrl,
      openShareModal,
      handleToast,
    }) => {
      const extractAccountAndRepo = () => {
        if (!githubRepository) return;

        const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;

        const match = githubRepository.match(regex);

        if (match) {
          const accountName = match[1];
          const repoName = match[2];
          window.open(
            `${INSIGHTS_WEBAPP}/${accountName}/${repoName}`,
            '_blank'
          );
        } else {
          handleToast();
        }
      };

      const handleContributeClick = () => {
        if (githubRepository) {
          window.open(`${githubRepository}/?ref=projectmate.net`, '_blank');
        }
      };

      const handleLiveClick = () => {
        if (liveUrl) {
          window.open(`${liveUrl}/?ref=projectmate.net`, '_blank');
        }
      };

      return (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
          transition={{ duration: 1 }}
          className="border border-gray-200 dark:border-gray-800 md:m-auto md:w-full"
        >
          <div className="flex h-full flex-col items-center overflow-hidden rounded-md">
            <div className="flex w-full grow flex-col justify-center gap-5 p-4 pt-4">
              <header className="flex flex-row items-start justify-between">
                <Typography
                  as="h2"
                  fontWeight="semibold"
                  className="flex w-full flex-col gap-4 truncate text-base text-gray-900 md:text-xl"
                >
                  <div className="flex w-full flex-row items-center justify-between">
                    <p
                      className="w-40 truncate  hover:cursor-pointer dark:text-gray-300 md:w-auto"
                      onClick={handleContributeClick}
                    >
                      {title}
                    </p>
                    <Typography
                      as="p"
                      fontSize="sm"
                      fontWeight="normal"
                      className="flex flex-row items-center text-gray-900 dark:text-gray-300"
                    >
                      <History height={16} />
                      <time dateTime={createdAt.toString()}>
                        {moment(createdAt).fromNow()}
                      </time>
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="text-sm">
                      <AvatarImage src={authorImage || undefined}></AvatarImage>
                      <AvatarFallback className="dark:text-gray-300">
                        {author &&
                          author
                            .split(' ')
                            .map((word) => word[0])
                            .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600 dark:text-gray-300 md:text-base">
                      {author}
                    </span>
                  </div>
                </Typography>
              </header>
              <Typography
                as="p"
                fontSize="sm"
                className="text-gray-600 dark:text-gray-300"
              >
                {description}
              </Typography>
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-2 pb-2 md:pb-0">
                  {tags.map((tag, idx) => {
                    return (
                      <Badge variant="secondary" key={idx}>
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-between sm:gap-2">
                <div className="flex flex-row items-center">
                  <Button
                    size={'sm'}
                    variant={'ghost'}
                    onClick={extractAccountAndRepo}
                  >
                    <BarChart2 className="mr-1" />
                    <span className="hidden md:block">Stats</span>
                  </Button>
                  <Button
                    size={'sm'}
                    variant={'ghost'}
                    onClick={handleContributeClick}
                  >
                    <GitPullRequest className="mr-1" />
                    <span className="hidden md:block">Contribute</span>
                  </Button>
                </div>
                <Button
                  size={'sm'}
                  onClick={() =>
                    openShareModal({ title, url: githubRepository })
                  }
                  variant={'ghost'}
                >
                  <Forward className="mr-1" />
                  <span className="hidden md:block">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.li>
      );
    }
  );

Project.displayName = 'Project';
