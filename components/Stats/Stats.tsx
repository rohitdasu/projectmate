import { BiGitRepoForked, BiCode } from 'react-icons/bi';
import { MdOutlinePersonOutline, MdStarOutline } from 'react-icons/md';
import { VscIssues } from 'react-icons/vsc';
import { GrLicense } from 'react-icons/gr';

const Title = ({ ...props }) => {
  return (
    <p className="text-md flex flex-row items-center gap-2 font-medium text-gray-600 dark:text-gray-300">
      {props.children}
    </p>
  );
};

const Value = ({ ...props }) => {
  return (
    <span className="rounded-md p-2 text-orange-500 dark:text-orange-300">
      {props.children}
    </span>
  );
};

export const Stats = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-6 text-left text-2xl font-semibold">Project Stats.</h2>
      <div className="items-between flex w-full flex-col justify-between gap-2">
        <div className="flex flex-row flex-wrap items-center gap-4 md:flex-nowrap md:gap-16">
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <MdOutlinePersonOutline /> Owner
            </Title>
            <Value>Rohit Dasu</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <BiGitRepoForked />
              Forks
            </Title>
            <Value>48</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <MdStarOutline />
              Stars
            </Title>
            <Value>61</Value>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-4 md:flex-nowrap md:gap-16">
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <VscIssues />
              Opened issues
            </Title>
            <Value>10</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <GrLicense /> License
            </Title>
            <Value>MIT</Value>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <Title>
              <BiCode />
              Language
            </Title>
            <Value>Typescript</Value>
          </div>
        </div>
      </div>
    </div>
  );
};
