import React, { useRef, useState } from 'react';
import {
  Search,
  ProjectsList,
  AuthModal,
  SharedLayout,
} from '../../components';
import { Icon } from '@iconify/react';
import { FloatingMenu } from '@/components/FloatingButtonMenu';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useOnClickOutside } from 'usehooks-ts';

const Projects = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const fabColor = '#2854eecc';
  const tColor = 'white';
  const ref = useRef(null);

  const toggleFloatingMenu = () => setIsOpen((prevState) => !prevState);
  const handleClickOutside = () => setIsOpen(false);

  useOnClickOutside(ref, handleClickOutside);

  return (
    <SharedLayout title="Projects" hideFooter>
      <div className="flex flex-col">
        <AuthModal title={'Continue with your social accounts'} />
        <div className="sticky top-0 z-10 backdrop-blur-3xl">
          <Search />
        </div>
        <ProjectsList />
        {session && (
          <div ref={ref} className="fixed bottom-7 right-7 md:right-[85px]">
            <FloatingMenu
              toggleMenu={toggleFloatingMenu}
              isOpen={isOpen}
              slideSpeed={300}
              spacing={18}
              mainButton={
                <Icon
                  icon="akar-icons:plus"
                  height={30}
                  width={30}
                  className="text-orange-500 dark:text-orange-400"
                />
              }
            >
              <div onClick={() => router.push('/projects/submit')}>
                <Icon
                  icon="akar-icons:file"
                  height={30}
                  width={30}
                  className="text-orange-500 dark:text-orange-400"
                />
              </div>
            </FloatingMenu>
          </div>
        )}
      </div>
    </SharedLayout>
  );
};

export default Projects;
