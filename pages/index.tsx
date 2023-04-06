import React from 'react';
import type { NextPage } from 'next';
import { SharedLayout } from '@/components/SharedLayout';
import { HeroComponent } from '@/components/LandingPage/HeroComponent';
import { BenefitsComponent } from '@/components/LandingPage/BenefitsComponent';
import { SuccessStoryComponent } from '@/components/LandingPage/SuccessStoryComponent';
import { ActionComponent } from '@/components/LandingPage/ActionComponent';
import { TeamsComponent } from '@/components/LandingPage/TeamsComponent';

const Home: NextPage = () => {
  return (
    <SharedLayout title="Home" hasContainer={false}>
      <>
        <HeroComponent />
        <BenefitsComponent />
        <SuccessStoryComponent />
        <ActionComponent />
        <TeamsComponent />
      </>
    </SharedLayout>
  );
};

export default Home;
