import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import {
  HeroComponent,
  ActionComponent,
  Header,
  Footer,
  VideoDemo,
  FeaturesComponent,
  FAQ,
} from '@/components/views/LandingPage';
import { favicons } from '@/data';
import { prisma } from '../lib/prisma';

interface HomeProps {
  userCount: number | null;
  randomUsers: User[] | null;
}

export type User = {
  id: string;
  name: string;
  image: string;
  username: string;
};

const Home: NextPage<HomeProps> = ({ userCount, randomUsers }) => {
  return (
    <>
      <Head>
        <title>Projectmate</title>
        {favicons.map((favicon, index) => (
          <link key={index} {...favicon} />
        ))}
      </Head>
      <Header />
      <main className="my-16 flex flex-col gap-16 md:my-32 md:gap-32">
        <HeroComponent userCount={userCount} randomUsers={randomUsers} />
        <VideoDemo />
        <FeaturesComponent />
        <ActionComponent />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const userCount = await prisma.user.count();
    const allUsers = await prisma.user.findMany({
      select: {
        image: true,
        name: true,
        id: true,
        username: true,
      },
    });
    const randomUsers = shuffleArray(allUsers).slice(0, 4);

    return {
      props: {
        userCount,
        randomUsers,
      },
    };
  } catch (error) {
    return {
      props: {
        userCount: null,
        randomUsers: null,
      },
    };
  }
};

function shuffleArray(array: any[]) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default Home;
