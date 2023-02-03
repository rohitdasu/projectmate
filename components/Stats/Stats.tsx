import { BiGitRepoForked, BiCode, BiLink } from 'react-icons/bi';
import { MdStarOutline } from 'react-icons/md';
import { RxPerson } from 'react-icons/rx';
import { VscIssues } from 'react-icons/vsc';
import { FiKey } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { IoClipboardOutline } from 'react-icons/io5';
import { messageType, toastMessage } from 'shared';
import { SlGlobe, SlPeople } from 'react-icons/sl';
import { Typography } from '@/components/Typography';

const Title = ({ ...props }) => {
  return (
    <Typography
      as="p"
      fontSize="base"
      fontWeight="medium"
      className="flex flex-row items-center gap-2 text-slate-300"
    >
      {props?.children}
    </Typography>
  );
};

const Value = ({ ...props }) => {
  return (
    <span className="rounded-md p-2 text-slate-400">{props?.children}</span>
  );
};

export const Stats = ({ ...props }) => {
  const copyText = (text: string) => {
    if (!navigator.clipboard) return;
    navigator?.clipboard?.writeText(text);
    toastMessage('copied successfully!', messageType.success);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      className="mt-6 flex flex-col gap-4 rounded-lg bg-slate-800 p-4 md:p-8"
    >
      <Typography as="h2" align="left" fontSize="2xl" fontWeight="semibold">
        Project Stats.
      </Typography>
      <div className="items-between flex w-full flex-col justify-between gap-2">
        <div className="flex flex-row flex-wrap items-center gap-4 lg:flex-nowrap lg:gap-16">
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <RxPerson className="text-2xl" /> Owner
            </Title>
            <Value>
              <a
                href={props?.owner?.html_url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center transition-all hover:underline"
              >
                {props?.owner?.login} <BiLink />
              </a>
            </Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <BiGitRepoForked className="text-2xl" />
              Forks
            </Title>
            <Value>{props?.forks_count}</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <MdStarOutline className="text-2xl" />
              Stars
            </Title>
            <Value>{props?.stargazers_count}</Value>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-4 lg:flex-nowrap lg:gap-16">
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <VscIssues className="text-2xl" />
              Opened issues
            </Title>
            <Value>{props?.open_issues_count}</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <FiKey className="text-2xl" /> License
            </Title>
            <Value>
              {props?.license?.name ? (
                <a
                  href={props?.license?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row items-center transition-all hover:underline"
                >
                  {props?.license?.name} <BiLink />
                </a>
              ) : (
                'NO LICENSE'
              )}
            </Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <BiCode className="text-2xl" />
              Language
            </Title>
            <Value>{props?.language || 'NOT FOUND'}</Value>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-4 lg:flex-nowrap lg:gap-16">
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <SlGlobe className="text-2xl" />
              Demo
            </Title>
            <Value>
              {props?.homepage ? (
                <a
                  href={props?.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row items-center transition-all hover:underline"
                >
                  {props?.homepage} <BiLink />
                </a>
              ) : (
                'NOT FOUND'
              )}
            </Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <SlPeople className="text-2xl" />
              Subscribers
            </Title>
            <Value>{props?.subscribers_count}</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <BiLink className="text-2xl" />
              Clone SSH
            </Title>
            <Value>
              <div
                onClick={() => copyText(props?.ssh_url)}
                className="flex cursor-pointer flex-row items-center gap-1"
              >
                copy <IoClipboardOutline />
              </div>
            </Value>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
