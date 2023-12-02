import React from 'react';
import { Loader, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useAuthModal } from '@/hooks/useAuthModal';
import { NavRoutes } from '../Sidebar/data';
import { useAddProjectModal } from '@/hooks/useAddProjectModal';
import { AddProjectModal } from '@/components/Modals/AddProjectModal';
import Link from 'next/link';
import { useAppData } from '@/context/Common/CommonContext';

export const BottomBar = () => {
  const { openModal } = useAuthModal();
  const profile = useAppData();
  const { openModal: openAddProjectModal } = useAddProjectModal();
  const { status, data } = useSession();
  const handleAddProject = () => {
    if (status === 'authenticated') {
      openAddProjectModal();
    } else {
      openModal();
    }
  };
  const router = useRouter();

  const handleNavLink = (nav: { link: string; addUsername?: boolean }) => {
    if (nav.addUsername && profile.profileDetails?.results?.username) {
      return `${nav.link}/${profile.profileDetails.results.username}`;
    } else {
      return nav.link;
    }
  };

  return (
    <div className="h-full w-full">
      <AddProjectModal email={data?.user?.email} />
      <ul className="flex h-14 flex-row items-center justify-around">
        {profile.isDetailsLoading && (
          <div>
            <Loader className="animate-spin" />
          </div>
        )}
        {!profile.isDetailsLoading &&
          NavRoutes.map((route) => {
            const isActive =
              router.pathname === route.link ||
              router.pathname === route.link + '/[username]';
            if (route.authGuard && status === 'unauthenticated') {
              return;
            }
            // eslint-disable-next-line consistent-return
            return (
              <Link href={handleNavLink(route)} key={route.id}>
                <li className={`${isActive && ''}`}>
                  {React.cloneElement(route.icon, {
                    strokeWidth: isActive ? 2 : 1,
                  })}
                </li>
              </Link>
            );
          })}
      </ul>
      <section className="fixed bottom-20 right-5">
        <Button
          onClick={handleAddProject}
          size={'icon'}
          className="h-12 w-12 rounded-full"
        >
          <PlusCircle className="h-8 w-8" />
        </Button>
      </section>
    </div>
  );
};
