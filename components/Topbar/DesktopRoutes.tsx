import Link from 'next/link';
import { useRouter } from 'next/router';
import { appRoutes } from './data';

export const DesktopRoutes = () => {
  const { pathname } = useRouter();

  return (
    <ul className="hidden gap-5 capitalize md:flex">
      {appRoutes.map((route) => {
        const { title, url, Icon, anchorTagProps } = route;
        const isCurrent = pathname === url || pathname.includes(title);

        return (
          <li key={title}>
            <Link href={url}>
              <a
                className={`flex items-center gap-1 ${
                  isCurrent && 'text-primary-1 font-bold'
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
