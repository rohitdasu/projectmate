import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ContributorList } from '../components';

const About: NextPage = () => {
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
    <SharedLayout title="About">
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
    </SharedLayout>
  );
};

export default About;
