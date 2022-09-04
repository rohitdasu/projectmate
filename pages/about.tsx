import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
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
      json.then((data) => {
        setContributors(data);
      });
    });
  }, []);

  const mode = useAppSelector((state) => state.mode.mode);
  return (
    <div
      className={`flex min-h-screen flex-col items-center  ${
        mode && 'bg-dark-mode'
      }`}
    >
      <Head>
        <title>Projectmate | About</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Navbar active={'about'} />
      <main tw="flex mt-[8rem]  lg:w-full flex-1 "></main>
      <footer
        className={`flex  flex-col h-24 mt-auto w-full items-center bg-white justify-center border-t px-6 lg:px-20 shadow-md ${
          mode && '!bg-dark-mode border-t-0'
        } `}
      >
        <p className={`text-lg font-light  mb-2 pb-0 ${mode && 'text-white'}`}>
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
