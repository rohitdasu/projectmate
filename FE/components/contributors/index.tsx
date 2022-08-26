import Image from 'next/image';
import { Fragment } from 'react';
import { IContributors } from '../../interfaces';

type Props = {
  contributors: IContributors[];
};

const ContributorList = ({ contributors }: Props) => {
  return (
    <Fragment>
      {contributors.map((contributor, index) => (
        <a
          key={index}
          href={contributor.html_url}
          target="_blank"
          rel="noreferrer"
          title={contributor.html_url.split('/')[3]}
        >
          <Image
            src={contributor.avatar_url}
            alt={contributor.html_url.split('/')[3]}
            width={30}
            height={30}
            tw="rounded-full bg-black"
          />
        </a>
      ))}
    </Fragment>
  );
};

export default ContributorList;
