import { FC, useEffect, useRef, useState } from 'react';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { IoLogOut } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import Image from 'next/legacy/image';

export const SessionCard: FC<Pick<User, 'email' | 'name' | 'image'>> = ({
  email,
  name,
  image,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <li
        onClick={toggleDropdown}
        className="relative h-9 w-full cursor-pointer text-gray-400 transition-all hover:text-gray-300"
      >
        <div className="block lg:hidden">
          <Image
            src={image as string}
            alt="user-photo"
            width={30}
            height={30}
            className="h-full w-full rounded-full bg-black"
          />
        </div>
        <span className="relative hidden text-lg transition-colors lg:block ">
          <div className="flex flex-row items-center justify-start gap-3">
            <Image
              src={image as string}
              alt="user-photo"
              width={30}
              height={30}
              className="h-full rounded-full bg-black"
            />
            <div>{name}</div>
          </div>
        </span>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="bg-white-100 absolute bottom-14 w-full rounded-lg border border-gray-500 shadow-lg sm:w-4/5"
          >
            <ul className="py-2">
              <li
                className="flex items-center justify-center"
                onClick={() => signOut({ redirect: false })}
              >
                <IoLogOut size={25} className="block lg:hidden" />
                <span className="text-grey hidden items-center gap-3 px-4 text-right text-lg transition-colors hover:text-red-500 lg:flex ">
                  <MdLogout size={22} />
                  Logout
                </span>
              </li>
            </ul>
          </div>
        )}
      </li>
    </>
  );
};
