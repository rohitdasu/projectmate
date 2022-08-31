import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { closeuserLogged } from '../../store/slices/userSlice';

export default function DropDown({ userImg }: any) {
  const dispatch = useDispatch();
  const mode = useAppSelector((state) => state.mode.mode);
  const userLogged = useAppSelector((state) => state.user.userLogged);
  // mode - false (light-mode) | mode - true (dark-mode)
  return (
    <div
      className={` fixed ${
        userLogged ? 'block' : '!hidden'
      } z-[999] w-max text-right`}
    >
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Image
              src={userImg}
              alt="user-photo"
              height={40}
              width={40}
              className="object-contain rounded-full"
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
          <Menu.Items
            className={`absolute right-0 mt-2 w-40 ${
              mode ? '!bg-dark-mode' : '!bg-white'
            } origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="px-1 py-1 w-full ">
              <Menu.Item>
                <button
                  className={`hover:bg-primary-color ${
                    mode ? '!text-white' : '!text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Profile
                </button>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      signOut(auth);
                      dispatch(closeuserLogged());
                    }}
                    className={`hover:bg-primary-color ${
                      mode ? '!text-white' : '!text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
