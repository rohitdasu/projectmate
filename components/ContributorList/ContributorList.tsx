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
          <motion.a
            whileHover={{ scale: 2.5 }}
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
          </motion.a>
        ))}
    </Fragment>
  );
};
