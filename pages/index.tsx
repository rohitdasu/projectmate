import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import {
  HeroComponent,
  BenefitsComponent,
  SuccessStoryComponent,
  ActionComponent,
  ContributorsComponent,
  Header,
  Footer,
} from '@/components/LandingPage';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Projectmate</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <main>
        <HeroComponent />
        <BenefitsComponent />
        <SuccessStoryComponent />
        <ActionComponent />
        <ContributorsComponent />
      </main>
      <Footer />
    </>
  );
};

export default Home;
