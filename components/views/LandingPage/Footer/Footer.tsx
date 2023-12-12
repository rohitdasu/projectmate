import Link from 'next/link';
import { icons, legalLinks, usefulLinks } from './data';
import React from 'react';
import { maintainers } from '@/data';
import Image from 'next/image';
import { SiBuymeacoffee } from 'react-icons/si';

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
            <ul className="mb-4 flex gap-4">
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

          {/* Developers */}
          <div>
            <h2 className="mb-4 text-base font-normal dark:text-gray-300 md:text-lg">
              Developed by
            </h2>
            <div className="mb-4 flex flex-col items-start">
              <div className="flex flex-wrap items-center gap-2">
                {maintainers.map((maintainer, index) => (
                  <div
                    className="transition-all hover:z-10 hover:-translate-y-1"
                    style={{ marginLeft: index > 0 ? -20 : 0 }}
                    key={index}
                  >
                    <Link href={maintainer.github} target="_blank">
                      <Image
                        src={maintainer.avatar}
                        alt={`${maintainer.name}'s Avatar`}
                        className="mb-2 h-10 w-10 rounded-full object-cover"
                        height={50}
                        width={50}
                      />
                    </Link>
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
            <Link
              href="https://www.buymeacoffee.com/rohit.dasu"
              target="_blank"
            >
              <section className="flex max-w-fit flex-row items-center gap-1 rounded-lg bg-[#FFDC03] px-4 py-3">
                <SiBuymeacoffee className="text-xl md:text-2xl" />
                <span className="text-sm md:text-base">Buy me a coffee</span>
              </section>
            </Link>
          </div>
        </div>
        <div className="mt-10 text-center text-sm font-normal text-gray-700 dark:text-white">
          <p>projectmate {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};
