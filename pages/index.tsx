import React from 'react';
import type { NextPage } from 'next';
import {
  SharedLayout,
  HeroComponent,
  BenefitsComponent,
  SuccessStoryComponent,
  ActionComponent,
  TeamsComponent,
} from '@/components';

const Home: NextPage = () => {
  return (
    <SharedLayout
      title="Home"
      hasContainer={false}
      showFooter
      showAddButton={false}
    >
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
