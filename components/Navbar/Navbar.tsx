import Image from 'next/image';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeMode } from '../../slices/ModeSlice';
import { Icon } from '@iconify/react';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const Mode = useAppSelector((state) => state.mode.mode);
  const [menuState, setMenuState] = useState(false);
  return (
    <nav className={`relative w-full h-max`}>
      <div
        className={`flex h-20  w-full items-center bg-white justify-between border-t px-2 sm:px-6 md:px-20 shadow-md ${
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
          <a
            href="#"
            className="text-[20px] flex items-center font-normal active"
          >
            Home
          </a>
          <a href="#" className="text-[20px] flex items-center font-normal ">
            Projects
          </a>
          <a href="#" className="text-[20px] flex items-center font-normal">
            About
          </a>
        </div>
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
                height={25}
                width={25}
              />
            ) : (
              <Image
                src={'/night-mode.svg'}
                alt="night-mode"
                height={20}
                width={20}
              />
            )}
          </a>
          <a
            onClick={() => setMenuState(!menuState)}
            className={`${
              Mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            } p-2 sm:hidden rounded-full flex items-center justify-center `}
          >
            {Mode ? (
              menuState ? (
                <Icon
                  icon="charm:menu-hamburger"
                  color="white"
                  height={30}
                  width={30}
                />
              ) : (
                <Icon
                  icon="akar-icons:cross"
                  color="white"
                  height={30}
                  width={30}
                />
              )
            ) : menuState ? (
              <Icon icon="charm:menu-hamburger" height={30} width={30} />
            ) : (
              <Icon icon="akar-icons:cross" height={30} width={30} />
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
                width={30}
                height={30}
              />
            ) : (
              <Image
                src="/github.svg"
                alt="Github Logo"
                width={30}
                height={30}
              />
            )}
          </a>
          <a
            href="https://discord.gg/M2BMPdku"
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
                width={30}
                height={30}
              />
            ) : (
              <Image
                tw="ml-4"
                src="/discord.svg"
                alt="Discord-logo"
                width={30}
                height={30}
              />
            )}
          </a>
        </div>
      </div>
      <div
        className={`" ${
          menuState && 'hidden'
        } absolute z-55 w-full shadow-lg  ${
          Mode ? 'bg-dark-mode' : 'bg-white'
        } md:block md:w-auto"`}
      >
        <ul className="flex w-full flex-col  space-y-2  p-4 mt-4  rounded-lg  border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
          <li>
            <a
              href="#"
              className={`block ${
                Mode ? 'text-dark-mode' : 'text-white'
              } bg-primary-color py-2 pr-4 pl-3 text-white rounded font-semibold`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`block ${
                Mode ? 'text-white' : 'text-black'
              } py-2 pr-4 pl-3  `}
            >
              Project
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`block ${
                Mode ? 'text-white' : 'text-black'
              } py-2 pr-4 pl-3  `}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`block ${
                Mode ? 'text-white' : 'text-black'
              } py-2 pr-4 pl-3  `}
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`block ${
                Mode ? 'text-white' : 'text-dark-mode'
              }    py-2 pr-4 pl-3  `}
            >
              Discord
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
