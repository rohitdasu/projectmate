import Head from 'next/head';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../app/hooks';
import { Search, Project, Navbar, AuthModal } from '../components';
import useSWR from 'swr';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import { Icon } from '@iconify/react';
import 'twin.macro';
import { Topbar } from '@/components/Topbar/Topbar';

const Projects = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error } = useSWR('/api/project', fetcher);
  const mode = useAppSelector((state) => state.mode.mode);
  const isLoggedIn = useAppSelector((state) => state.user.isLogged);
  const [isOpen, setIsOpen] = useState(false);
  const fabColor = mode ? '#eee' : '#444';
  const tColor = mode ? '#000' : '#fff';

  if (error) return <div> failed to load</div>;
  if (!data) return <div>loading ... </div>;
  return (
    <div>
      <Head>
        <title>Projectmate | Projects</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Topbar />
      <main className="flex flex-col w-full">
        <Toaster />
        <AuthModal title={'Continue with your social accounts'} />
        <div className="sticky top-0 z-10 backdrop-blur-3xl">
          <Search />
        </div>
        <div className="container gap-5 p-3 m-auto md:p-5 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.results.map((project: any) => {
            console.log(project);
            return (
              <Project
                key={project.id}
                description={project.description}
                title={project.title}
                tags={project.tags}
                author={project.author.email}
              />
            );
          })}
        </div>
        {isLoggedIn && (
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
    </div>
  );
};

export default Projects;
