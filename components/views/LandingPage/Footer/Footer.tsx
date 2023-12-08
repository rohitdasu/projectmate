import Link from 'next/link';
import { icons, legalLinks, tags, usefulLinks } from './data';

const Icons = icons.map((social) => {
  return {
    id: social.id,
    link: social.link,
    name: social.name,
  };
});

export const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <footer className="bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-screen-xl py-8 px-4 md:px-8 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-lg dark:text-gray-300">Connect with Us</h2>
            <ul className="flex gap-4">
              {Icons.map((social) => {
                return (
                  <li key={social.id}>
                    <Link
                      href={social.link}
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      <span className="cursor-pointer text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-300 md:text-base">
                        {social.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg dark:text-gray-300">Useful Links</h2>
            <ul>
              {usefulLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.link}>
                    <span className="cursor-pointer text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-300 md:text-base">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg dark:text-gray-300">Legal</h2>
            <ul>
              {legalLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.link} target={item.target}>
                    <span className="cursor-pointer text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-300 md:text-base">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg dark:text-gray-300">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm text-muted-foreground md:text-base"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm font-bold text-gray-700 dark:text-white">
          <p>projectmate {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};
