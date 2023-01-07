import Image from 'next/legacy/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Typography } from '@/components/Typography';

export function SidebarAvatar() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    const { user } = session;
    return (
      <>
        <div
          onClick={() => router.push('/user/profile')}
          className="mt-2 flex w-full items-center"
        >
          <div className="mr-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-full shadow-border-shadow">
              <Image
                src={
                  user?.image ||
                  `https://avatars.dicebear.com/api/initials/${user?.name}.png?backgroundColorLevel=800&fontSize=40`
                }
                layout="fill"
                alt={user?.name || 'avatar'}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Typography as="p" fontSize="sm" className="truncate">
              {user?.name}
            </Typography>
            <Typography
              as="p"
              fontSize="xs"
              className="truncate text-black/60  dark:text-white/75"
            >
              {user?.email}
            </Typography>
          </div>
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
}
