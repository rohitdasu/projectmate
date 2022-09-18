import { FiMenu } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { appRoutes } from './data';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { framer_sidebar_background, framer_sidebar_panel } from './framer';
import { BiArrowBack } from 'react-icons/bi';
import { Logo } from './Logo';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const ref = useRef(null);

  const closeSidebar = () => setOpen(false);

  useOnClickOutside(ref, closeSidebar);

  return (
    <>
      <button
        className="md:hidden flex p-[0.67rem] overflow-hidden text-[1.6rem] shadow-border-shadow rounded-md"
        onClick={() => setOpen(true)}
      >
        <FiMenu />
      </button>
      <AnimatePresence initial={false} exitBeforeEnter>
        {open && (
          <>
            <motion.div
              {...framer_sidebar_background}
              className="fixed top-0 bottom-0 left-0 right-0 z-20 backdrop-blur-sm bg-[rgba(0,0,0,0.5)]"
            ></motion.div>

            <motion.div
              {...framer_sidebar_panel}
              className="fixed z-30 left-0 top-0 bottom-0 h-screen bg-background-1 w-[100%] max-w-[19rem] flex flex-col justify-between"
              ref={ref}
            >
              <div className="flex items-center justify-between p-5">
                <Logo />
                <button
                  className="flex p-[0.67rem] overflow-hidden shadow-border-shadow rounded-md"
                  onClick={closeSidebar}
                >
                  <BiArrowBack />
                </button>
              </div>
              <ul>
                {appRoutes.map((route) => {
                  const { Icon, anchorTagProps, title, url } = route;
                  const isCurrent =
                    pathname === url || pathname.includes(title);

                  return (
                    <li key={title}>
                      <Link href={url}>
                        <a
                          {...anchorTagProps}
                          className={`flex justify-between items-center gap-2 p-5 text-lg capitalize ${
                            isCurrent && 'bg-background-2'
                          }`}
                        >
                          {title}
                          <Icon className="text-2xl" />
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <p className="p-5 text-center opacity-50">version 0</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
