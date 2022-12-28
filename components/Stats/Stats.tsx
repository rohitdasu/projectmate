import { BiGitRepoForked, BiCode, BiLink } from 'react-icons/bi';
import { MdOutlinePersonOutline, MdStarOutline } from 'react-icons/md';
import { VscIssues } from 'react-icons/vsc';
import { FiKey } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Title = ({ ...props }) => {
  return (
    <p className="text-md flex flex-row items-center gap-2 font-medium text-slate-600 dark:text-slate-300">
      {props.children}
    </p>
  );
};

const Value = ({ ...props }) => {
  return (
    <span className="rounded-md p-2 text-slate-900 dark:text-slate-400">
      {props.children}
    </span>
  );
};

export const Stats = ({ ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      className="mt-6 flex flex-col gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-800 md:p-8"
    >
      <h2 className="text-left text-2xl font-semibold">Project Stats.</h2>
      <div className="items-between flex w-full flex-col justify-between gap-2">
        <div className="flex flex-row flex-wrap items-center gap-4 md:flex-nowrap md:gap-16">
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <MdOutlinePersonOutline className="text-2xl" /> Owner
            </Title>
            <Value>
              <a
                href={props.owner.html_url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center transition-all hover:underline"
              >
                {props.owner.login} <BiLink />
              </a>
            </Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <BiGitRepoForked className="text-2xl" />
              Forks
            </Title>
            <Value>{props.forks_count}</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <MdStarOutline className="text-2xl" />
              Stars
            </Title>
            <Value>{props.stargazers_count}</Value>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-4 md:flex-nowrap md:gap-16">
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <VscIssues className="text-2xl" />
              Opened issues
            </Title>
            <Value>{props.open_issues_count}</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <FiKey className="text-2xl" /> License
            </Title>
            <Value>{props.license.name}</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <BiCode className="text-2xl" />
              Language
            </Title>
            <Value>{props.language}</Value>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
