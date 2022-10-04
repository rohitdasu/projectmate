import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { NextPage } from 'next';
import useSWR from 'swr';
import { ContributorList } from '@/components/index';
import axios from 'axios';

const About: NextPage = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data } = useSWR(
    'https://api.github.com/repos/rohitdasu/projectmate/contributors',
    fetcher
  );

  return (
    <SharedLayout title="About">
      <div className="flex-1 lg:w-full "></div>
      <footer className="mt-auto flex h-24 w-full flex-col items-center justify-center bg-background-1 px-6 lg:px-20">
        <p className="mb-2 pb-0 text-lg font-light">
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
