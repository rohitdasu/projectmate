import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { NextPage } from 'next';
import useSWR from 'swr';
import { ContributorList } from '@/components/index';

const About: NextPage = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data } = useSWR(
    'https://api.github.com/repos/rohitdasu/projectmate/contributors',
    fetcher
  );

  return (
    <SharedLayout title="About">
      <div className="lg:w-full flex-1 "></div>
      <footer className="flex flex-col items-center justify-center w-full h-24 px-6 mt-auto lg:px-20 bg-background-1">
        <p className="pb-0 mb-2 text-lg font-light">
          Shout-out to our contributors
        </p>
        <div className="flex flex-wrap items-center justify-center">
          <ContributorList contributors={data} />
        </div>
      </footer>
    </SharedLayout>
  );
};

export default About;
