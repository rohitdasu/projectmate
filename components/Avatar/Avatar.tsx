import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineAccountCircle, MdArrowDropDown } from 'react-icons/md';
import { motion } from 'framer-motion';
export function Avatar() {
  const { data: session } = useSession();

  if (session) {
    const { user } = session;
    return (
      <>
        <Menu as="div" className="relative hidden text-left md:inline-block">
          <Menu.Button>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center hover:opacity-80"
            >
              <div className="relative my-[0.67rem] h-[47px] w-[47px] overflow-hidden rounded-full shadow-border-shadow">
                <Image
                  src={
                    user?.image ||
                    `https://avatars.dicebear.com/api/initials/${user?.name}.png?backgroundColorLevel=800&fontSize=40`
                  }
                  layout="fill"
                  alt={user?.name || 'avatar'}
                />
              </div>
              <MdArrowDropDown className="text-2xl" />
            </motion.div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 top-[64px] z-50 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
              <div className="w-full px-1 py-1 ">
                <Menu.Item>
                  <Link href="/profile">
                    <a>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="group flex w-full items-center rounded-md px-2 py-2 text-left transition-all hover:bg-primary-color hover:text-white"
                      >
                        <MdOutlineAccountCircle className="mr-2 text-xl" />
                        Profile
                      </motion.button>
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-left transition-all hover:bg-primary-color hover:text-white"
                    onClick={() => signOut({ redirect: false })}
                  >
                    <HiOutlineLogout className="mr-2 text-xl" /> Logout
                  </motion.button>
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
