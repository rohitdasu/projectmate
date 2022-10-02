import { Fragment } from 'react';
import Image from 'next/image';
import { ContributorProps } from './ContributorList.interface';

export const ContributorList = ({ contributors }: ContributorProps) => {
  return (
    <Fragment>
      {contributors &&
        contributors.length > 0 &&
        contributors.map((contributor, index) => (
          <div
            className="our-team relative w-60 overflow-hidden text-center"
            key={index}
          >
            <Image
              src={contributor.avatar_url}
              alt={contributor.html_url.split('/')[3]}
              width={200}
              height={200}
              className="object-cover"
            />
            <div className="team-content">
              <h3 className="title font-700 text-lg">
                {contributor.html_url.split('/')[3]}
              </h3>
              <ul className="icon">
                <li className="inline-block">
                  <a
                    target="_blank"
                    aria-label="github"
                    href={contributor.html_url}
                    className="
              iconify
              block h-10
              w-10
              rounded-full
              border
              border-solid
              text-center
              text-base
              leading-9
              hover:border-gray-900 hover:bg-gray-900
            "
                    rel="noreferrer"
                  >
                    <span
                      className="iconify m-auto mt-1 text-xl"
                      data-icon="icon"
                    >
                      <img src="icon.svg" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
    </Fragment>
  );
};
