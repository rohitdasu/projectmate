import axios from 'axios';
import useSWR from 'swr';
import { ContributorList } from '../ContributorList';

export const Thanks = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data } = useSWR(
    'https://api.github.com/repos/rohitdasu/projectmate/contributors',
    fetcher
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-20 text-center text-2xl font-bold md:text-3xl">
        Thanks to our contributors
      </h2>
      <div className="flex flex-row flex-wrap items-center justify-between md:justify-center">
        <ContributorList contributors={data} />
      </div>
    </div>
  );
};
