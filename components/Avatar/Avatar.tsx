import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineAccountCircle } from 'react-icons/md';

export function Avatar() {
  // TODO
  const { data: session } = useSession();

  if (session) {
    const { user } = session;
    return (
      <>
        <Menu as="div" className="relative md:inline-block text-left hidden">
          <div>
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
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute w-36 right-0 top-[64px] origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 w-full ">
                <Menu.Item>
                  <button className="flex items-center w-full text-left rounded-md px-2 py-2 hover:bg-primary-color hover:text-white group transition-all ">
                    <MdOutlineAccountCircle className="text-xl mr-1" />
                    Profile
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button className="flex items-center w-full text-left rounded-md px-2 py-2 hover:bg-primary-color hover:text-white group transition-all ">
                    <HiOutlineLogout className="text-xl mr-1" /> Logout
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </>
    );
  } else {
    return <div></div>;
  }
}
