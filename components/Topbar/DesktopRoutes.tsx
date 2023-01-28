import Link from 'next/link';
import { useRouter } from 'next/router';
import { appRoutes } from './data';
import { useSession } from 'next-auth/react';

export const DesktopRoutes = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  return (
    <ul className="hidden gap-5 uppercase lg:flex">
      {appRoutes.map((route) => {
        const { title, url, Icon, anchorTagProps, protectedRoute } = route;
        const isCurrent = pathname === url || pathname.includes(title);
        if (protectedRoute && !session) {
          return null;
        }
        return (
          <li key={title + url + new Date()}>
            <Link
              href={url}
              className={`flex cursor-pointer items-center gap-1 text-gray-700 transition-all hover:!text-primary-1 dark:text-gray-400 ${
                isCurrent && '!text-primary-1'
              }`}
              {...anchorTagProps}
            >
              <Icon />
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
