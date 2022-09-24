import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Search, ProjectsList, AuthModal } from '../components';
import { Icon } from '@iconify/react';
import { FloatingMenu } from '@/components/FloatingButtonMenu';
import { useSession } from 'next-auth/react';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { useTheme } from 'next-themes';

const Projects = () => {
  const { theme } = useTheme();

  const mode = theme === 'dark' ? true : false;
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const fabColor = mode ? '#eee' : '#444';
  const tColor = mode ? '#000' : '#fff';

  const toggleFloatingMenu = () => setIsOpen((prevState) => !prevState);

  return (
    <SharedLayout title="Projects">
      <div className="flex flex-col w-full">
        <Toaster />
        <AuthModal title={'Continue with your social accounts'} />
        <div className="sticky top-0 z-10 backdrop-blur-3xl">
          <Search />
        </div>
        <ProjectsList />
        {session && (
          <div className="bottom-7 fixed right-7 md:right-[85px]">
            <FloatingMenu
              toggleMenu={toggleFloatingMenu}
              isOpen={isOpen}
              slideSpeed={300}
              bgColor={fabColor}
              spacing={18}
              mainButton={
                <Icon
                  icon="akar-icons:plus"
                  color={tColor}
                  height={30}
                  width={30}
                />
              }
            >
              <div onClick={() => alert('Clicked on create project')}>
                <Icon
                  icon="akar-icons:file"
                  color={tColor}
                  height={30}
                  width={30}
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
