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
  const handleClickOutisde = () => setIsOpen(false);

  useOnClickOutside(ref, handleClickOutisde);

  return (
    <SharedLayout title="Projects">
      <div className="flex flex-col w-full">
        <AuthModal title={'Continue with your social accounts'} />
        <div className="sticky top-0 z-10 backdrop-blur-3xl">
          <Search />
        </div>
        <ProjectsList />
        {session && (
          <div ref={ref} className="bottom-7 fixed right-7 md:right-[85px]">
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
              <div onClick={() => router.push('/projects/submit')}>
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
