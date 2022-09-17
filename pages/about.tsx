import { Topbar } from '@/components/Topbar/Topbar';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../app/hooks';
import { IContributors, Navbar, ContributorList } from '../components';

type Props = {
  contributors: IContributors[];
};

const About: NextPage<Props> = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.github.com/repos/rohitdasu/projectmate/contributors'
    ).then((response) => {
      const json = response.json();
      json
        .then((data) => {
          setContributors(data);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Projectmate | About</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      {/* <Navbar active={'about'} /> */}
      <Topbar />
      <main tw="flex mt-[8rem]  lg:w-full flex-1 ">
        <Toaster />
      </main>
      <footer className="flex flex-col items-center justify-center w-full h-24 px-6 mt-auto shadow-md lg:px-20 bg-background-1">
        <p className="pb-0 mb-2 text-lg font-light">
          Shout-out to our contributors
        </p>

        <div tw="flex items-center justify-around w-[80%] lg:w-1/5">
          <ContributorList contributors={contributors} />
        </div>
      </footer>
    </div>
  );
};

export default About;
