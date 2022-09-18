import Link from 'next/link';
import { appRoutes } from './data';

export const DesktopRoutes = () => {
  return (
    <ul className="hidden gap-5 capitalize md:flex">
      {appRoutes.map((route) => {
        const { title, url, Icon, anchorTagProps } = route;
        return (
          <li key={title}>
            <Link href={url}>
              <a className="flex items-center gap-1" {...anchorTagProps}>
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
