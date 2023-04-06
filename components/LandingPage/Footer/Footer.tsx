import React from 'react';
import Link from 'next/link';
import * as SiIcon from 'react-icons/si';
import { icons } from './data';

const Icons = icons.map((social) => {
  return {
    id: social.id,
    icon: SiIcon[social.name as keyof typeof SiIcon],
    link: social.link,
    name: social.name,
  };
});

export const Footer = () => {
  return (
    <div className="border-t border-gray-800 px-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-4 py-8 md:flex-row md:gap-0">
        <ul className="flex w-1/2 flex-row items-center justify-between gap-4 md:w-auto lg:justify-center">
          {Icons.map((social) => {
            return (
              <li key={social.id} className="">
                <a
                  href={social.link}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <social.icon
                    className="text-gray-400 hover:text-gray-300"
                    size={24}
                  />
                </a>
              </li>
            );
          })}
        </ul>
        <a href="#" className="text-base text-gray-500 hover:text-gray-400">
          MIT License
        </a>
        <Link href="#" className="text-base text-gray-500 hover:text-gray-400">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};
