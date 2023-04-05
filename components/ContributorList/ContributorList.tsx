import { Fragment } from 'react';
import Image from 'next/legacy/image';
import { ContributorProps } from './ContributorList.interface';
import { motion } from 'framer-motion';

export const ContributorList = ({ contributors }: ContributorProps) => {
  return (
    <Fragment>
      {contributors &&
        contributors.length > 0 &&
        contributors.map((contributor, index) => (
          <motion.li key={index} whileHover={{ scale: 1.2 }}>
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noreferrer"
              className="mx-2"
              title={contributor.html_url.split('/')[3]}
            >
              <Image
                src={contributor.avatar_url}
                alt={contributor.html_url.split('/')[3]}
                width={64}
                height={64}
                className="rounded-full bg-black"
              />
            </a>
          </motion.li>
        ))}
    </Fragment>
  );
};
