import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { appRoutes } from './data';

export const DesktopRoutes = () => {
  const { pathname } = useRouter();

  return (
    <ul className="hidden gap-5 uppercase md:flex">
      {appRoutes.map((route) => {
        const { title, url, Icon, anchorTagProps } = route;
        const isCurrent = pathname === url || pathname.includes(title);

        return (
          <li key={title}>
            <Link href={url}>
              <motion.a
                whileTap={{ scale: 0.9 }}
                className={`flex items-center hover:text-primary-1 gap-1 cursor-pointer ${
                  isCurrent && 'text-primary-1'
                }`}
                {...anchorTagProps}
              >
                <Icon />
                {title}
              </motion.a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
