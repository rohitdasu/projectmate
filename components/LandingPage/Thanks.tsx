import axios from 'axios';
import useSWR from 'swr';
import { ContributorList } from '../ContributorList';
import { Typography } from '@/components/Typography';

export const Thanks = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data } = useSWR(
    'https://api.github.com/repos/rohitdasu/projectmate/contributors',
    fetcher
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <Typography
        as="h2"
        align="center"
        fontSize="2xl"
        fontWeight="bold"
        className="pb-12 md:text-3xl"
      >
        Thanks to our contributors
      </Typography>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
        <ContributorList contributors={data} />
      </div>
    </div>
  );
};
