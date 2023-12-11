import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const maintainers = [
  {
    name: 'Rohit',
    avatar: 'https://avatars.githubusercontent.com/u/48400770?v=4',
  },
  {
    name: 'Leewan',
    avatar: 'https://avatars.githubusercontent.com/u/60838584?v=4',
  },
  {
    name: 'Jakub',
    avatar: 'https://avatars.githubusercontent.com/u/74047866?v=4',
  },
  {
    name: 'Yazdun',
    avatar: 'https://avatars.githubusercontent.com/u/83041367?v=4',
  },
];

export const MaintainersComponent = () => {
  return (
    <section className="mx-auto max-w-screen-lg py-10 text-center">
      <div>
        <h2 className="mb-4 text-lg font-bold md:text-3xl">Developed by</h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {maintainers.map((maintainer, index) => (
            <div
              className="transition-all hover:z-10 hover:-translate-y-1"
              style={{ marginLeft: index > 0 ? -30 : 0 }}
              key={index}
            >
              <Image
                src={maintainer.avatar}
                alt={`${maintainer.name}'s Avatar`}
                className="mb-2 h-10 w-10 rounded-full object-cover md:h-16 md:w-16"
                height={50}
                width={50}
              />
            </div>
          ))}
          <Link
            href="https://github.com/rohitdasu/projectmate/graphs/contributors"
            target="_blank"
          >
            <span className="text-sm text-blue-600 dark:text-blue-400 md:text-base">
              and others
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
