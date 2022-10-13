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
    <SharedLayout title="Home" hasContainer>
      <div>
        <Hero />
        <Guide />
        <BenefitsContainer />
        <About />
      </div>
    </SharedLayout>
  );
};

export default Home;
