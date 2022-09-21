import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../app/hooks';
import { Search, ProjectsList, AuthModal } from '../components';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import { Icon } from '@iconify/react';
import 'twin.macro';
import { useSession } from 'next-auth/react';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { NextPage } from 'next';

const Projects = () => {
  const mode = useAppSelector((state) => state.mode.mode);
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const fabColor = mode ? '#eee' : '#444';
  const tColor = mode ? '#000' : '#fff';

  return (
    <SharedLayout title="Projects">
      <main className="flex flex-col w-full">
        <Toaster />
        <AuthModal title={'Continue with your social accounts'} />
        <div className="sticky top-0 z-10 backdrop-blur-3xl">
          <Search />
        </div>
        <ProjectsList />
        {session && (
          <div tw="bottom-7 fixed right-7 md:right-[85px] bottom-7">
            <FloatingMenu
              slideSpeed={300}
              direction={Directions.Up}
              spacing={18}
              isOpen={isOpen}
            >
              <MainButton
                iconResting={
                  <Icon
                    icon="akar-icons:plus"
                    color={tColor}
                    height={30}
                    width={30}
                  />
                }
                iconActive={
                  <Icon
                    icon="akar-icons:cross"
                    color={tColor}
                    height={30}
                    width={30}
                  />
                }
                onClick={() => setIsOpen(!isOpen)}
                size={56}
                background={fabColor}
              />

              <ChildButton
                icon={
                  <Icon
                    icon="akar-icons:file"
                    color={tColor}
                    height={30}
                    width={30}
                  />
                }
                size={56}
                onClick={() => alert('clicked on create project')}
                background={fabColor}
              />
            </FloatingMenu>
          </div>
        )}
      </main>
    </SharedLayout>
  );
};

export default Projects;
