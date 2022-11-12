import { FiMenu } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { appRoutes, IRoute, getSocialLinks } from './data';
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

  const socialLinks = getSocialLinks(true);

  const RenderNavigation: React.FC<{ routes: IRoute[] }> = ({ routes }) => {
    return (
      <ul className="w-full overflow-auto">
        {routes.map((route) => {
          const { Icon, anchorTagProps, title, url } = route;
          const isCurrent = pathname === url || pathname.includes(title);

          return (
            <motion.li whileTap={{ scale: 0.9 }} key={title}>
              <Link
                href={url}
                {...anchorTagProps}
                className={`flex items-center justify-between gap-2 p-5 text-lg uppercase ${
                  isCurrent && 'bg-background-2'
                }`}>

                {title}
                <Icon className="text-2xl" />

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
        className="flex overflow-hidden rounded-md p-[0.67rem] text-[1.6rem] shadow-border-shadow md:hidden"
        onClick={() => setOpen(true)}
      >
        <FiMenu />
      </motion.button>
      <AnimatePresence initial={false} mode="wait">
        {open && (
          <>
            <motion.div
              {...framer_sidebar_background}
              className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm md:hidden"
            ></motion.div>

            <motion.div
              {...framer_sidebar_panel}
              className="fixed left-0 top-0 bottom-0 z-30 flex h-screen w-[100%] max-w-[19rem] flex-col bg-background-1 md:hidden"
              ref={ref}
            >
              <div className="border-b-[1px] border-gray-1 p-5">
                <div className="flex items-center justify-between">
                  <Logo />
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="flex overflow-hidden rounded-md p-[0.67rem] shadow-border-shadow"
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
                  className="flex w-full items-center justify-between gap-2 p-5 text-lg uppercase"
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
