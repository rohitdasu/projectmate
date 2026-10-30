import { FC } from 'react';
import { SharedLayoutProps } from './SharedLayout.interface';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { AddProjectModal } from '@/components/Modals/AddProjectModal';
import { Logo } from '@/components/Common/Logo';
import { AccountMenu } from '@/components/Common/AccountMenu';

export const SharedLayout: FC<SharedLayoutProps> = ({
  title = '',
  children,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const isExplorePage = router.pathname === '/explore';

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#f8f9fa] text-[#0f0f0f]">
      <Head>
        <title>{`${title} | Projectmate`}</title>
      </Head>
      <header className="sticky top-0 z-40 border-b-2 border-[#0f0f0f] bg-[#f8f9fa]/95 px-4 backdrop-blur md:px-8">
        <nav
          className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 py-3"
          aria-label="Main navigation"
        >
          <Logo route="/" />
          <div className="flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-wide sm:gap-5 sm:text-xs md:gap-8">
            <Link
              href="/explore"
              className={`transition-colors hover:text-[#0044ff] ${
                router.pathname === '/explore' ? 'text-[#0044ff]' : ''
              }`}
            >
              Explore
            </Link>
            <Link
              href="/community"
              className={`transition-colors hover:text-[#0044ff] ${
                router.pathname === '/community' ? 'text-[#0044ff]' : ''
              }`}
            >
              Community
            </Link>
          </div>
          <AccountMenu />
        </nav>
      </header>
      <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 pb-8 md:px-8 lg:px-12">
        {children}
      </main>
      {isExplorePage && <AddProjectModal email={session?.user?.email} />}
    </div>
  );
};
