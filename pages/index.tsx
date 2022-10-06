import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { BenefitsContainer, Guide, Hero } from '@/components/LandingPage/';

const Home: NextPage = () => {
  return (
    <SharedLayout title="Home">
      <Hero />
      <Guide />
      <BenefitsContainer />
    </SharedLayout>
  );
};

export default Home;
