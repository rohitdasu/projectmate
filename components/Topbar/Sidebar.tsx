import { FiMenu } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { appRoutes, IRoute, socialLinks } from './data';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { framer_sidebar_background, framer_sidebar_panel } from './framer';
import { BiArrowBack } from 'react-icons/bi';
import { Logo } from './Logo';
import { SidebarAvatar } from '@/components/Avatar';
import { HiOutlineLogout } from 'react-icons/hi';
import { signOut, useSession } from 'next-auth/react';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const ref = useRef(null);
  const { data: session } = useSession();

  const closeSidebar = () => setOpen(false);

  useOnClickOutside(ref, closeSidebar);

  const RenderNavigation: React.FC<{ routes: IRoute[] }> = ({ routes }) => {
    return (
      <ul className="w-full overflow-auto">
        {routes.map((route) => {
          const { Icon, anchorTagProps, title, url } = route;
          const isCurrent = pathname === url || pathname.includes(title);

          return (
            <motion.li whileTap={{ scale: 0.9 }} key={title}>
              <Link href={url}>
                <a
                  {...anchorTagProps}
                  className={`flex justify-between items-center gap-2 p-5 text-lg uppercase ${
                    isCurrent && 'bg-background-2'
                  }`}
                >
                  {title}
                  <Icon className="text-2xl" />
                </a>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.8 }}
        className="md:hidden flex p-[0.67rem] overflow-hidden text-[1.6rem] shadow-border-shadow rounded-md"
        onClick={() => setOpen(true)}
      >
        <FiMenu />
      </motion.button>
      <AnimatePresence initial={false} mode="wait">
        {open && (
          <>
            <motion.div
              {...framer_sidebar_background}
              className="fixed md:hidden top-0 bottom-0 left-0 right-0 z-20 backdrop-blur-sm bg-[rgba(0,0,0,0.5)]"
            ></motion.div>

            <motion.div
              {...framer_sidebar_panel}
              className="fixed md:hidden z-30 left-0 top-0 bottom-0 h-screen bg-background-1 w-[100%] max-w-[19rem] flex flex-col"
              ref={ref}
            >
              <div className="border-b-[1px] border-gray-1 p-5">
                <div className="flex items-center justify-between">
                  <Logo />
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="flex p-[0.67rem] overflow-hidden shadow-border-shadow rounded-md"
                    onClick={closeSidebar}
                  >
                    <BiArrowBack />
                  </motion.button>
                </div>
                <SidebarAvatar />
              </div>

              {<RenderNavigation routes={appRoutes} />}
              {<RenderNavigation routes={socialLinks} />}

              {session && (
                <button
                  className="flex justify-between w-full items-center gap-2 p-5 text-lg uppercase"
                  onClick={() => {
                    signOut({ redirect: false });
                    setOpen(false);
                  }}
                >
                  Logout
                  <HiOutlineLogout className="text-2xl" />
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
