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
              <a
                className={`flex items-center hover:text-primary-1 gap-1 cursor-pointer ${
                  isCurrent && 'text-primary-1'
                }`}
                {...anchorTagProps}
              >
                <Icon />
                {title}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
