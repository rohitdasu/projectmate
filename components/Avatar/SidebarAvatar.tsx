import Image from 'next/image';
import { useSession } from 'next-auth/react';

export function SidebarAvatar() {
  const { data: session } = useSession();
  if (session) {
    const { user } = session;
    return (
      <>
        <div className="flex w-full items-center mt-2">
          <div className="mr-3">
            <div className="relative w-16 h-16 overflow-hidden shadow-border-shadow rounded-full">
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
            <p className="text-sm truncate">{user?.name}</p>
            <p className="text-xs text-white/75 truncate">{user?.email}</p>
          </div>
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
}
