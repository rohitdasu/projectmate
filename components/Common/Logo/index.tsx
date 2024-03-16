import { FC } from 'react';
import Link from 'next/link';

interface LogoProps {
  route: string;
}

export const Logo: FC<LogoProps> = ({ route }) => {
  return (
    <Link href={route}>
      <section className="relative flex items-center gap-1 font-[montserrat] text-lg font-bold uppercase md:text-2xl">
        <div className="absolute -right-2 top-0 h-full w-[65px] skew-x-[-40deg] rounded-md bg-black dark:bg-white md:-right-3 md:w-[88px]" />
        <p>project</p>
        <p className="relative z-10 text-white dark:text-black">mate</p>
      </section>
    </Link>
  );
};
