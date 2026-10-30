import { FC } from 'react';
import Link from 'next/link';

interface LogoProps {
  route: string;
}

export const Logo: FC<LogoProps> = ({ route }) => {
  return (
    <Link href={route}>
      <section className="flex items-center gap-2 font-display text-xl font-black tracking-tight md:text-2xl">
        <span
          className="h-3.5 w-3.5 rounded-full bg-[#0044ff]"
          aria-hidden="true"
        />
        <span>PROJECT_MATE</span>
      </section>
    </Link>
  );
};
