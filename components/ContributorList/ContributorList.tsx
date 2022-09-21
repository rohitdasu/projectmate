import { Fragment } from 'react';
import Image from 'next/image';
import { ContributorProps } from './ContributorList.interface';

export const ContributorList = ({ contributors }: ContributorProps) => {
  return (
    <Fragment>
      {contributors &&
        contributors.length > 0 &&
        contributors.map((contributor, index) => (
          <a
            key={index}
            href={contributor.html_url}
            target="_blank"
            rel="noreferrer"
            className="mx-2"
            title={contributor.html_url.split('/')[3]}
          >
            <Image
              src={contributor.avatar_url}
              alt={contributor.html_url.split('/')[3]}
              width={30}
              height={30}
              className="rounded-full bg-black"
            />
          </a>
        ))}
    </Fragment>
  );
};
