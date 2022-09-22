import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export function Avatar() {
  // TODO
  const { data: session } = useSession();

  const mode = false;
  const isLogged = true;
  if (session) {
    const { user } = session;
    return (
      <>
        <Menu as="div" className="relative md:inline-block text-left hidden">
          <Menu.Button className="w-[47px] h-[47px] relative my-[0.67rem] overflow-hidden shadow-border-shadow rounded-full">
            <Image
              src={
                user?.image ||
                `https://avatars.dicebear.com/api/initials/${user?.name}.png?backgroundColorLevel=800&fontSize=40`
              }
              layout="fill"
              alt={user?.name || 'avatar'}
            />
          </Menu.Button>
        </Menu>
      </>
    );
  } else {
    return <div></div>;
  }
}
