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
