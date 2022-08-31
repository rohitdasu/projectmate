import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { DropDown } from '../DropDown';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeMode } from '../../store/slices/sliceMode';
import { setUserLoggedOut } from '../../store/slices/sliceUser';
import { NavProps } from './Navbar.interface';

export const Navbar = ({ active }: NavProps) => {
  const dispatch = useAppDispatch();
  const Mode = useAppSelector((state) => state.mode.mode);
  const userlogged = useAppSelector((state) => state.user.isLogged);
  const [menuState, setMenuState] = useState(false);
  const [user] = useAuthState(auth);
  return (
    <nav
      className={`relative shadow-md bg-white w-full h-max  ${
        Mode && '!bg-dark-mode'
      }`}
    >
      <div
        className={`flex h-20  w-[95%] items-center bg-white justify-between border-t px-2 sm:px-6 md:px-20  ${
          Mode && '!bg-dark-mode'
        }`}
      >
        <span
          className={`text-2xl flex items-center  md:space-x-2 font-semibold font-mono text-gray-900 uppercase ${
            Mode && '!text-white'
          }`}
        >
          {Mode ? (
            <Image src="/dark-logo.svg" height={40} width={40} alt="logo" />
          ) : (
            <Image src="/logo.svg" height={40} width={40} alt="logo" />
          )}

          <p>
            project<span className="text-primary-color">mate</span>
          </p>
        </span>

        <div
          className={`hidden lg:flex justify-around items-center w-[400px] h-full ${
            Mode && 'text-white'
          }`}
        >
          <Link href={'/'}>
            <a
              href=""
              className={`text-[20px] h-full ${
                Mode && 'hover:bg-gray-800'
              } items-center flex px-2 hover:bg-gray-100 font-normal ${
                active === 'home' && 'active'
              }`}
            >
              Home
            </a>
          </Link>
          <Link href={'/projects'}>
            <a
              href="#"
              className={`text-[20px] ${
                Mode && 'hover:bg-gray-800'
              } h-full flex items-center px-2 hover:bg-gray-100 font-normal ${
                active === 'projects' && 'active'
              }`}
            >
              Projects
            </a>
          </Link>
          <Link href={'/about'}>
            <a
              href="#"
              className={`text-[20px] ${
                Mode && 'hover:bg-gray-800'
              } h-full flex items-center px-2 hover:bg-gray-100 font-normal ${
                active === 'about' && 'active'
              }`}
            >
              About
            </a>
          </Link>
        </div>
        <div className="flex  items-center">
          <div className="flex items-center justify-between space-x-2 w-max sm:w-[150px]">
            <a
              href="#"
              onClick={() => dispatch(changeMode())}
              className={`${
                Mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              } p-2 rounded-full flex items-center justify-center `}
            >
              {Mode ? (
                <Image
                  src={'/light-mode.svg'}
                  alt="night-mode"
                  height={30}
                  width={30}
                />
              ) : (
                <Image
                  src={'/night-mode.svg'}
                  alt="night-mode"
                  height={30}
                  width={30}
                />
              )}
            </a>
            <a
              onClick={() => setMenuState(!menuState)}
              className={`${
                Mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              } p-2 sm:hidden cursor-pointer rounded-full flex items-center justify-center `}
            >
              {Mode ? (
                menuState ? (
                  <Icon
                    icon="akar-icons:cross"
                    color="white"
                    height={30}
                    width={30}
                  />
                ) : (
                  <Icon
                    icon="charm:menu-hamburger"
                    color="white"
                    height={30}
                    width={30}
                  />
                )
              ) : menuState ? (
                <Icon icon="akar-icons:cross" height={30} width={30} />
              ) : (
                <Icon icon="charm:menu-hamburger" height={30} width={30} />
              )}
            </a>
            <a
              href="https://github.com/rohitdasu/projectmate"
              target="_blank"
              rel="noreferrer"
              className={`${
                Mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              } p-2 hidden rounded-full sm:flex items-center justify-center `}
            >
              {Mode ? (
                <Image
                  src="/dark-github.svg"
                  alt="Github Logo"
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src="/github.svg"
                  alt="Github Logo"
                  width={40}
                  height={40}
                />
              )}
            </a>
            <a
              href="https://discord.gg/FQtyMWFZQ9"
              target="_blank"
              rel="noreferrer"
              className={`${
                Mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              } p-2 hidden rounded-full sm:flex items-center justify-center `}
            >
              {Mode ? (
                <Image
                  tw="ml-4"
                  src="/dark-discord.svg"
                  alt="Discord-logo"
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  tw="ml-4"
                  src="/discord.svg"
                  alt="Discord-logo"
                  width={40}
                  height={40}
                />
              )}
            </a>
          </div>
          {userlogged && (
            <div
              className={`${
                userlogged ? 'sm:flex hidden' : 'hidden'
              }  items-center`}
            >
              <DropDown userImg={user?.photoURL} />
            </div>
          )}
        </div>
      </div>
      <div
        className={`absolute  z-55 w-full shadow-lg  ${
          Mode ? 'bg-dark-mode' : 'bg-white'
        } md:block md:w-auto"`}
      >
        <ul
          className={`${
            menuState ? 'flex sm:hidden' : 'hidden'
          } w-full flex-col   space-y-2  p-4 mt-4  rounded-lg  border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 `}
        >
          <li>
            <Link
              href="/"
              className={`block ${
                Mode ? 'text-dark-mode' : 'text-white'
              } bg-primary-color py-2 pr-4 pl-3 text-white rounded font-semibold`}
            >
              <span
                className={`block ${
                  Mode ? 'text-dark-mode' : 'text-white'
                } bg-primary-color py-2 pr-4 pl-3 text-white rounded font-semibold`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href={'/projects'}>
              <span
                className={`block ${
                  Mode ? 'text-white' : 'text-black'
                } py-2 pr-4 pl-3  `}
              >
                Project
              </span>
            </Link>
          </li>
          <li>
            <Link href={'/about'}>
              <span
                className={`block ${
                  Mode ? 'text-white' : 'text-black'
                } py-2 pr-4 pl-3  `}
              >
                About
              </span>
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/rohitdasu/projectmate"
              className={`block ${
                Mode ? 'text-white' : 'text-black'
              } py-2 pr-4 pl-3  `}
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/FQtyMWFZQ9"
              className={`block ${
                Mode ? 'text-white' : 'text-dark-mode'
              }    py-2 pr-4 pl-3  `}
            >
              Discord
            </a>
          </li>
          {userlogged && (
            <>
              <li>
                <a
                  href="#"
                  className={`block ${
                    Mode ? 'text-white' : 'text-dark-mode'
                  }    py-2 pr-4 pl-3  `}
                >
                  Profile
                </a>
              </li>
              <li
                onClick={() => {
                  signOut(auth);
                  dispatch(setUserLoggedOut());
                }}
              >
                <a
                  href="#"
                  className={`block ${
                    Mode ? 'text-white' : 'text-dark-mode'
                  }    py-2 pr-4 pl-3  `}
                >
                  Log out
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
