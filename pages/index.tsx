import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import {
  About,
  BenefitsContainer,
  Guide,
  Hero,
} from '@/components/LandingPage/';

const Home: NextPage = () => {
  return (
    <SharedLayout title="Home">
      <Hero />
      <Guide />
      <BenefitsContainer />
      <About />
    </SharedLayout>
  );
};

export default Home;
