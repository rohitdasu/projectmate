import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Avatar } from '../Avatar';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeMode } from '../../store/slices/sliceMode';
import { setUserLogged, setUserLoggedOut } from '../../store/slices/sliceUser';
import { NavProps } from './Navbar.interface';
import toast from 'react-hot-toast';
import { Tooltip } from '../Tooltip';

export const Navbar = ({ active }: NavProps) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.mode.mode);
  const userlogged = useAppSelector((state) => state.user.isLogged);
  const [menuState, setMenuState] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user?.displayName) {
      dispatch(setUserLogged());
    }
  }, [user, dispatch]);

  return (
    <nav
      className={` fixed  z-[999] shadow-md bg-white w-screen h-max  ${
        mode && '!bg-dark-mode'
      }`}
    >
      <div
        className={`flex h-20  w-[95%] mx-auto items-center bg-white justify-between px-2 sm:px-6 md:px-10  ${
          mode && '!bg-dark-mode'
        }`}
      >
        <div>
          <span
            className={`text-2xl flex items-center  md:space-x-2 font-semibold font-mono text-gray-900 uppercase ${
              mode && '!text-white'
            }`}
          >
            {mode ? (
              <Image src="/dark-logo.svg" height={40} width={40} alt="logo" />
            ) : (
              <Image src="/logo.svg" height={40} width={40} alt="logo" />
            )}

            <p>
              project<span className="text-primary-color">mate</span>
            </p>
          </span>
        </div>

        <div
          className={`hidden lg:flex justify-around items-center w-[400px] h-full ${
            mode && 'text-white'
          }`}
        >
          <Tooltip content="Home" placement="left" wrapperClassName="h-full">
            <Link href={'/'}>
              <a
                href=""
                className={`text-[20px] h-full ${
                  mode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                } items-center flex px-2  font-normal ${
                  active === 'home' && 'active'
                }`}
              >
                Home
              </a>
            </Link>
          </Tooltip>
          <Tooltip
            content="Projects"
            placement="down"
            wrapperClassName="h-full"
          >
            <Link href={'/projects'}>
              <a
                href=""
                className={`text-[20px] ${
                  mode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                } h-full flex items-center px-2 font-normal ${
                  active === 'projects' && 'active'
                }`}
              >
                Projects
              </a>
            </Link>
          </Tooltip>
          <Tooltip content="About" placement="right" wrapperClassName="h-full">
            <Link href={'/about'}>
              <a
                href="#"
                className={`text-[20px] ${
                  mode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                } h-full flex items-center px-2 font-normal ${
                  active === 'about' && 'active'
                }`}
              >
                About
              </a>
            </Link>
          </Tooltip>
        </div>
        <div className="flex  items-center">
          <div className="flex items-center justify-between w-max">
            <Tooltip content="Toggle color mode">
              <a
                href="#"
                onClick={() => dispatch(changeMode())}
                className={`${
                  mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                } p-2 rounded-full flex items-center justify-center `}
              >
                {mode ? (
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
            </Tooltip>
            <a
              onClick={() => setMenuState(!menuState)}
              className={`${
                mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              } p-2 sm:hidden cursor-pointer rounded-full flex items-center justify-center `}
            >
              {mode ? (
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
            <Tooltip content="Github">
              <a
                href="https://github.com/rohitdasu/projectmate"
                target="_blank"
                rel="noreferrer"
                className={`${
                  mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                } p-2 hidden rounded-full sm:flex items-center justify-center `}
              >
                {mode ? (
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
            </Tooltip>
            <Tooltip content="Discord">
              <a
                href="https://discord.gg/FQtyMWFZQ9"
                target="_blank"
                rel="noreferrer"
                className={`${
                  mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                } p-2 hidden rounded-full sm:flex items-center justify-center `}
              >
                {mode ? (
                  <Image
                    src="/dark-discord.svg"
                    alt="Discord-logo"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    src="/discord.svg"
                    alt="Discord-logo"
                    width={40}
                    height={40}
                  />
                )}
              </a>
            </Tooltip>
            {userlogged && (
              <div
                className={`${userlogged && 'sm:flex'}  items-center hidden`}
              >
                <Avatar userImg={user?.photoURL} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`absolute  z-55 w-full shadow-lg  ${
          mode ? 'bg-dark-mode' : 'bg-white'
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
                mode ? 'text-dark-mode' : 'text-white'
              } bg-primary-color py-2 pr-4 pl-3 text-white rounded font-semibold`}
            >
              <span
                className={`block ${
                  mode ? 'text-white' : 'text-black'
                } py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3 ${
                  active === 'home' &&
                  'bg-primary-color !text-white font-semibold'
                }`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href={'/projects'}>
              <span
                className={`block ${
                  mode ? 'text-white' : 'text-black'
                } py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  ${
                  active === 'projects' &&
                  'bg-primary-color !text-white font-semibold'
                } `}
              >
                Project
              </span>
            </Link>
          </li>
          <li>
            <Link href={'/about'}>
              <span
                className={`block ${
                  mode ? 'text-white' : 'text-black'
                } py-2 hover:bg-primary-color hover:text-white hover:font-semibold  pr-4 pl-3 ${
                  active === 'about' &&
                  'bg-primary-color !text-white font-semibold'
                }  `}
              >
                About
              </span>
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/rohitdasu/projectmate"
              className={`block ${
                mode ? 'text-white' : 'text-black'
              } py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  `}
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/FQtyMWFZQ9"
              className={`block ${
                mode ? 'text-white' : 'text-dark-mode'
              }    py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  `}
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
                    mode ? 'text-white' : 'text-dark-mode'
                  }    py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  `}
                >
                  Profile
                </a>
              </li>
              <li
                onClick={() => {
                  signOut(auth);
                  dispatch(setUserLoggedOut());
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
                  setMenuState(!menuState);
                }}
              >
                <a
                  href="#"
                  className={`block ${
                    mode ? 'text-white' : 'text-dark-mode'
                  }    py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  `}
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
