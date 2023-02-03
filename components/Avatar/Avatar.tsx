import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/legacy/image';
import { signOut, useSession } from 'next-auth/react';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdArrowDropDown } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { getImageUrl } from './Avatar.common';
import { User } from '@prisma/client';

export function Avatar() {
  const { data: session } = useSession();

  if (session) {
    const { user } = session;
    return (
      <>
        <Menu as="div" className="relative hidden text-left lg:inline-block">
          <Menu.Button>
            <motion.div
              layout
              whileTap={{ scale: 0.9 }}
              className="flex items-center hover:opacity-80"
            >
              <div className="relative my-[0.67rem] h-[47px] w-[47px] overflow-hidden rounded-full shadow-border-shadow">
                <Image
                  src={getImageUrl(user as User)}
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
            <Menu.Items className="absolute right-0 top-[64px] z-50 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="w-full px-1 py-1 ">
                <Menu.Item>
                  <Link href="/user/profile">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="group flex w-full items-center rounded-md px-2 py-2 text-left opacity-75 transition-all hover:bg-primary-color hover:text-white hover:opacity-100"
                    >
                      <IoPersonOutline className="mr-2 text-xl" />
                      Profile
                    </motion.button>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-left opacity-75 transition-all hover:bg-primary-color hover:text-white hover:opacity-100"
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
