import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useAppSelector } from '../../app/hooks';
import toast from 'react-hot-toast';
import { IAvatar } from './Avatar.interface';
import { Icon } from '@iconify/react';

export function Avatar({ userImg, email }: IAvatar) {
  const mode = useAppSelector((state) => state.mode.mode);
  const isLogged = false;
  // mode - false (light-mode) | mode - true (dark-mode)
  return (
    <div className={`${isLogged ? 'block' : '!hidden'} z-50 w-max text-right`}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`${
              !mode ? 'text-gray-500' : 'text-white'
            } hover:opacity-80 inline-flex w-full p-2 items-center space-x-1 justify-center rounded-md bg-opacity-20 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <Image
              src={
                userImg ||
                `https://avatars.dicebear.com/api/initials/${email}.svg`
              }
              alt="user-photo"
              height={35}
              width={35}
              className="object-contain rounded-full"
            />
            <Icon
              icon="akar-icons:triangle-fill"
              className="rotate-180"
              height={12}
              width={12}
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
              mode ? '!bg-gray-700 text-white' : '!bg-white'
            } origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="px-1 py-1 w-full ">
              <Menu.Item>
                <button
                  className={`hover:bg-primary-color hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Profile
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => {
                    mode
                      ? toast.success('Logout was successful', {
                          position: 'bottom-center',
                          duration: 2000,
                          style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                          },
                        })
                      : toast.success('Logout was successful', {
                          position: 'bottom-center',
                        });
                  }}
                  className={`hover:bg-primary-color hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
