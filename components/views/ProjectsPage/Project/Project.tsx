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
import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';

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
          transition={{ duration: 1 }}
          layout
          className="group relative flex h-full flex-col border-2 border-[#0f0f0f] bg-white text-[#0f0f0f] shadow-[4px_4px_0_0_#0f0f0f] transition-[transform,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#0f0f0f]"
        >
          <div className="flex h-full flex-col">
            <div className="flex w-full grow flex-col justify-between gap-5 p-5 md:p-6">
              <header className="flex flex-col items-start gap-4">
                <Typography
                  as="h2"
                  fontWeight="bold"
                  className="flex w-full flex-col gap-4 truncate text-base text-gray-900 md:text-xl"
                >
                  <div className="flex w-full flex-row items-start justify-between gap-3">
                    <p
                      className="w-40 truncate font-display text-2xl font-black tracking-tight hover:cursor-pointer hover:text-[#0044ff] md:w-auto"
                      onClick={handleContributeClick}
                    >
                      {title}
                    </p>
                    <Typography
                      as="p"
                      fontSize="sm"
                      fontWeight="normal"
                      className="flex shrink-0 flex-row items-center gap-1 text-xs font-medium text-gray-500"
                    >
                      <History height={16} />
                      <time dateTime={createdAt.toString()}>
                        {moment(createdAt).fromNow()}
                      </time>
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex max-w-fit items-center gap-2">
                      <Avatar className="h-7 w-7 border border-[#0f0f0f]">
                        <AvatarImage
                          src={authorImage || undefined}
                        ></AvatarImage>
                        <AvatarFallback className="text-[8px] text-black opacity-70 dark:text-white">
                          {author &&
                            author
                              .split(' ')
                              .map((word) => word[0])
                              .join('')}
                        </AvatarFallback>
                      </Avatar>

                      <span className="text-xs font-semibold text-gray-600 md:text-sm">
                        {author}
                      </span>
                    </div>
                  </div>
                </Typography>
              </header>
              <Typography
                as="p"
                fontSize="sm"
                className="min-h-12 text-sm leading-relaxed text-gray-600"
              >
                {description}
              </Typography>
              <div className="flex flex-col gap-4">
                <div className="flex min-h-7 flex-wrap gap-2">
                  {tags.map((tag, idx) => {
                    return (
                      <Badge
                        variant="secondary"
                        className="rounded-none border border-[#0f0f0f] bg-[#f1f5ff] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0044ff]"
                        key={idx}
                      >
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div className="mt-auto flex w-full flex-row items-center justify-between gap-2 border-t-2 border-gray-100 pt-4">
                <div className="flex flex-row items-center gap-1">
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    className="h-9 border-[#0f0f0f] bg-white px-2 text-xs text-[#0f0f0f] hover:bg-[#0044ff] hover:text-white"
                    onClick={extractAccountAndRepo}
                  >
                    <BarChart2 className="mr-1" />
                    <span className="hidden md:block">{BUTTON_TEXT.stats}</span>
                  </Button>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    className="h-9 border-[#0f0f0f] bg-white px-2 text-xs text-[#0f0f0f] hover:bg-[#0044ff] hover:text-white"
                    onClick={handleContributeClick}
                  >
                    <GitPullRequest className="mr-1" />
                    <span className="hidden md:block">
                      {BUTTON_TEXT.contribute}
                    </span>
                  </Button>
                  {liveUrl && (
                    <Button
                      size={'sm'}
                      variant={'outline'}
                      className="h-9 border-[#0f0f0f] bg-white px-2 text-xs text-[#0f0f0f] hover:bg-[#0044ff] hover:text-white"
                      onClick={handleLiveClick}
                    >
                      <Globe2 className="mr-1" />
                      <span className="hidden md:block">
                        {BUTTON_TEXT.live}
                      </span>
                    </Button>
                  )}
                </div>
                <Button
                  size={'sm'}
                  onClick={() =>
                    openShareModal({ title, url: githubRepository })
                  }
                  variant={'outline'}
                  className="h-9 border-[#0f0f0f] bg-white px-2 text-xs text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white"
                >
                  <Forward className="mr-1" />
                  <span className="hidden md:block">{BUTTON_TEXT.share}</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.li>
      );
    }
  );

Project.displayName = 'Project';
