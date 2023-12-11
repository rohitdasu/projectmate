import Link from 'next/link';
import { icons, legalLinks, tags, usefulLinks } from './data';
import React from 'react';
import { Logo } from '@/components/Common/Logo';

const Icons = icons.map((social) => ({
  id: social.id,
  link: social.link,
  name: social.name,
}));

const FooterLink = ({
  href,
  target,
  children,
}: {
  href: string;
  target?: string;
  children?: React.ReactNode;
}) => (
  <Link href={href} target={target}>
    <span className="cursor-pointer text-xs font-light text-muted-foreground hover:text-gray-900 dark:hover:text-gray-300 md:text-sm">
      {children}
    </span>
  </Link>
);

export const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className="bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-screen-lg py-8 px-4 md:px-8 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Connect with Us */}
          <div>
            <h2 className="mb-4 text-base font-normal dark:text-gray-300 md:text-lg">
              Connect with Us
            </h2>
            <ul className="flex gap-4">
              {Icons.map((social) => (
                <li key={social.id}>
                  <FooterLink href={social.link} target="_blank">
                    {social.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h2 className="mb-4 text-base font-normal dark:text-gray-300 md:text-lg">
              Useful Links
            </h2>
            <ul>
              {usefulLinks.map((item, idx) => (
                <li key={idx}>
                  <FooterLink href={item.link}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-4 text-base font-normal dark:text-gray-300 md:text-lg">
              Legal
            </h2>
            <ul>
              {legalLinks.map((item, idx) => (
                <li key={idx}>
                  <FooterLink href={item.link} target={item.target}>
                    {item.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h2 className="mb-4 text-base font-normal dark:text-gray-300 md:text-lg">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-light text-muted-foreground md:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm font-normal text-gray-700 dark:text-white">
          <p>projectmate {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};
