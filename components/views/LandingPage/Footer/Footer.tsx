import Link from 'next/link';
import { icons } from './data';

const Icons = icons.map((social) => {
  return {
    id: social.id,
    link: social.link,
    name: social.name,
  };
});

const tags = [
  'Open-source',
  'Portfolio',
  'Collaboration',
  'Contributors',
  'Github',
  'Stats',
  'Profile',
  'projectmate.net',
];

export const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-xl">Connect with Us</h2>
            <ul className="flex gap-4">
              {Icons.map((social) => {
                return (
                  <li key={social.id}>
                    <Link
                      href={social.link}
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      <span className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-300">
                        {social.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl">Useful Links</h2>
            <ul>
              <li>
                <Link href="/projects">
                  <span className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-300">
                    Projects
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/mates">
                  <span className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-300">
                    Mates
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/posts">
                  <span className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-300">
                    Posts
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl">Legal</h2>
            <ul>
              <li>
                <Link
                  href="https://github.com/rohitdasu/projectmate/blob/main/LICENSE"
                  target="_blank"
                >
                  <span className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-300">
                    MIT License
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-300">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-300">
                    Terms of Service
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm font-bold text-black dark:text-white">
          <p>projectmate 2023</p>
        </div>
      </div>
    </footer>
  );
};
