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
      <div className="flex flex-row flex-wrap items-center justify-between md:justify-center">
        <ContributorList contributors={data} />
      </div>
    </div>
  );
};
